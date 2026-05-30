const { cache } = require('../config/redis');
const { getIO } = require('../utils/ioInstance');
const { v4: uuidv4 } = require('uuid');

const TOTAL_VISITORS_KEY = 'total_visitors';
const SEEN_SESSIONS_KEY  = 'seen_sessions';

let dbCountLoaded = false;

// On first request, sync the in-memory counter from MongoDB so
// Render restarts don't reset the displayed total to 0
async function syncCounterFromDB() {
  if (dbCountLoaded) return;
  dbCountLoaded = true;
  try {
    const Visitor = require('../models/Visitor');
    const count = await Visitor.countDocuments();
    if (count > 0) {
      const current = parseInt(await cache.get(TOTAL_VISITORS_KEY)) || 0;
      if (current < count) {
        // In-memory is behind (server just restarted) — restore from DB
        await cache.set(TOTAL_VISITORS_KEY, String(count));
        console.log(`[analytics] Restored total_visitors from MongoDB: ${count}`);
      }
    }
  } catch { /* DB not available yet */ }
}

async function trackVisitor(req, res) {
  try {
    const sessionId = req.body.sessionId || uuidv4();

    // Sync counter from DB on first request after restart
    await syncCounterFromDB();

    // Check MongoDB first — if this sessionId already exists, don't re-count
    let isNew = false;
    try {
      const Visitor = require('../models/Visitor');
      const existing = await Visitor.findOne({ sessionId }, '_id');
      if (!existing) {
        isNew = true;
        await Visitor.create({
          sessionId,
          ipAddress: req.ip,
          userAgent: req.get('user-agent'),
          referrer: req.get('referrer'),
          firstVisit: new Date(),
          lastSeen: new Date(),
          pageViews: 1,
        });
      } else {
        await Visitor.updateOne({ sessionId }, {
          $set: { lastSeen: new Date() },
          $inc: { pageViews: 1 },
        });
      }
    } catch (dbErr) {
      // DB unavailable — fall back to in-memory dedup
      console.warn('[analytics] DB check failed, using memory dedup:', dbErr.message);
      const added = await cache.sadd(SEEN_SESSIONS_KEY, sessionId);
      isNew = added > 0;
    }

    const totalVisitors = await getTotalVisitorsFromDB();

    const paidMembers = await getPaidMembersCount();

    // If new visitor — instantly push updated count to ALL open tabs
    if (isNew) {
      const io = getIO();
      if (io) {
        io.emit('stats:update', {
          activeUsers: io.engine.clientsCount,
          totalVisitors,
          paidMembers,
          timestamp: Date.now(),
        });
      }
    }

    res.json({ sessionId, totalVisitors, paidMembers });
  } catch (error) {
    console.error('[analytics] trackVisitor error:', error.message);
    res.status(500).json({ error: 'Tracking failed' });
  }
}

async function getStats(req, res) {
  try {
    const [totalVisitors, paidMembers] = await Promise.all([
      getTotalVisitorsFromDB(),
      getPaidMembersCount(),
    ]);
    await cache.set(TOTAL_VISITORS_KEY, String(totalVisitors));
    res.json({ totalVisitors, paidMembers, timestamp: Date.now() });
  } catch (error) {
    const totalVisitors = parseInt(await cache.get(TOTAL_VISITORS_KEY)) || 0;
    res.json({ totalVisitors, paidMembers: 0, timestamp: Date.now() });
  }
}

// Exported so socketManager can use the same source of truth
async function getTotalVisitorsFromDB() {
  try {
    const Visitor = require('../models/Visitor');
    return await Visitor.countDocuments();
  } catch {
    return parseInt(await cache.get(TOTAL_VISITORS_KEY)) || 0;
  }
}

async function getPaidMembersCount() {
  try {
    const Order = require('../models/Order');
    return await Order.countDocuments({ status: 'paid' });
  } catch {
    return 0;
  }
}

module.exports = { trackVisitor, getStats, getTotalVisitorsFromDB, getPaidMembersCount };
