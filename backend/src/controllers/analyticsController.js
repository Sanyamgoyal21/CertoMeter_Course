const { cache } = require('../config/redis');
const { v4: uuidv4 } = require('uuid');

const TOTAL_VISITORS_KEY = 'total_visitors';
const ACTIVE_USERS_KEY = 'active_users';

async function trackVisitor(req, res) {
  try {
    const sessionId = req.body.sessionId || uuidv4();
    const totalVisitors = await cache.incr(TOTAL_VISITORS_KEY);

    try {
      const Visitor = require('../models/Visitor');
      await Visitor.findOneAndUpdate(
        { sessionId },
        {
          $set: { lastSeen: new Date(), ipAddress: req.ip, userAgent: req.get('user-agent'), referrer: req.get('referrer') },
          $inc: { pageViews: 1 },
        },
        { upsert: true, new: true }
      );
    } catch { /* continue without DB */ }

    res.json({ sessionId, totalVisitors: parseInt(totalVisitors) || 1 });
  } catch (error) {
    res.status(500).json({ error: 'Tracking failed' });
  }
}

async function getStats(req, res) {
  try {
    const [activeUsers, totalVisitors] = await Promise.all([
      cache.scard(ACTIVE_USERS_KEY),
      cache.get(TOTAL_VISITORS_KEY),
    ]);

    res.json({
      activeUsers: Math.max(parseInt(activeUsers) || 0, 1),
      totalVisitors: parseInt(totalVisitors) || 0,
      timestamp: Date.now(),
    });
  } catch (error) {
    res.json({ activeUsers: 1, totalVisitors: 0, timestamp: Date.now() });
  }
}

module.exports = { trackVisitor, getStats };
