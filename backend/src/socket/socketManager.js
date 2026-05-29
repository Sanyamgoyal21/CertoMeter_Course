const { cache } = require('../config/redis');
const { v4: uuidv4 } = require('uuid');

const ACTIVE_USERS_KEY = 'active_users';
const TOTAL_VISITORS_KEY = 'total_visitors';
const BROADCAST_INTERVAL = 3000;

function initSocketManager(io) {
  const connectedSockets = new Map();

  io.on('connection', async (socket) => {
    const sessionId = socket.handshake.query.sessionId || uuidv4();
    connectedSockets.set(socket.id, sessionId);

    // Track active user
    await cache.sadd(ACTIVE_USERS_KEY, sessionId);
    await cache.incr(TOTAL_VISITORS_KEY);

    console.log(`🔌 Client connected: ${socket.id} (session: ${sessionId})`);

    // Send initial counts immediately
    const activeCount = await cache.scard(ACTIVE_USERS_KEY);
    const totalVisitors = await cache.get(TOTAL_VISITORS_KEY);

    socket.emit('stats:update', {
      activeUsers: Math.max(parseInt(activeCount) || 1, 1),
      totalVisitors: parseInt(totalVisitors) || 1,
      timestamp: Date.now(),
    });

    socket.on('ping', () => socket.emit('pong', { timestamp: Date.now() }));

    socket.on('disconnect', async () => {
      const sid = connectedSockets.get(socket.id);
      if (sid) {
        await cache.srem(ACTIVE_USERS_KEY, sid);
        connectedSockets.delete(socket.id);
      }
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });

  // Broadcast active user count to all clients
  setInterval(async () => {
    try {
      const activeCount = await cache.scard(ACTIVE_USERS_KEY);
      const totalVisitors = await cache.get(TOTAL_VISITORS_KEY);

      io.emit('stats:update', {
        activeUsers: Math.max(parseInt(activeCount) || 0, io.engine.clientsCount),
        totalVisitors: parseInt(totalVisitors) || 0,
        timestamp: Date.now(),
      });
    } catch (err) {
      console.error('Broadcast error:', err.message);
    }
  }, BROADCAST_INTERVAL);

  console.log('🔌 Socket.IO manager initialized');
}

module.exports = { initSocketManager };
