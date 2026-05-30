const { getTotalVisitorsFromDB, getPaidMembersCount } = require('../controllers/analyticsController');
const { v4: uuidv4 } = require('uuid');

const BROADCAST_INTERVAL = 3000;

function initSocketManager(io) {
  // Keyed by socket.id — one entry per open tab, guaranteed unique
  const connectedSockets = new Map();

  async function broadcast() {
    try {
      const [totalVisitors, paidMembers] = await Promise.all([
        getTotalVisitorsFromDB(),
        getPaidMembersCount(),
      ]);
      io.emit('stats:update', {
        activeUsers: connectedSockets.size,
        totalVisitors,
        paidMembers,
        timestamp: Date.now(),
      });
    } catch (err) {
      console.error('Broadcast error:', err.message);
    }
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
