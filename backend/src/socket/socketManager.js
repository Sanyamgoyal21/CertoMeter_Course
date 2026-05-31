const { getTotalVisitorsFromDB, getPaidMembersCount } = require('../controllers/analyticsController');
const { v4: uuidv4 } = require('uuid');

const BROADCAST_INTERVAL = 3000;

function initSocketManager(io) {
  // Keyed by socket.id — one entry per open tab, guaranteed unique
  const connectedSockets = new Map();

  async function broadcast() {
    // Capture immediately — no async needed for this
    const activeUsers = connectedSockets.size;

    let totalVisitors = 0;
    let paidMembers = 0;
    try {
      [totalVisitors, paidMembers] = await Promise.all([
        getTotalVisitorsFromDB(),
        getPaidMembersCount(),
      ]);
    } catch (err) {
      console.error('Broadcast DB error:', err.message);
    }

    // Always emit — even if DB queries failed, activeUsers is always accurate
    io.emit('stats:update', { activeUsers, totalVisitors, paidMembers, timestamp: Date.now() });
  }

  io.on('connection', async (socket) => {
    const sessionId = socket.handshake.query.sessionId || uuidv4();
    connectedSockets.set(socket.id, sessionId);

    console.log(`🔌 +1 connected | socket: ${socket.id} | session: ${sessionId} | active: ${connectedSockets.size}`);

    // Immediately tell ALL clients the updated count
    broadcast();

    socket.on('ping', () => socket.emit('pong', { timestamp: Date.now() }));

    socket.on('disconnect', () => {
      connectedSockets.delete(socket.id);
      console.log(`🔌 -1 disconnected | socket: ${socket.id} | active: ${connectedSockets.size}`);
      broadcast();
    });
  });

  // Heartbeat — one timer for the whole server lifetime
  setInterval(broadcast, BROADCAST_INTERVAL);

  console.log('🔌 Socket.IO manager initialized');
}

module.exports = { initSocketManager };
