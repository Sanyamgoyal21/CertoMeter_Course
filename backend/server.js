require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { Server } = require('socket.io');

const { connectDB } = require('./src/config/database');
const { getRedisClient } = require('./src/config/redis');
const { initSocketManager } = require('./src/socket/socketManager');
const analyticsRoutes = require('./src/routes/analytics');
const leadsRoutes = require('./src/routes/leads');
const newsletterRoutes = require('./src/routes/newsletter');
const paymentRoutes = require('./src/routes/payment');
const emailRoutes = require('./src/routes/email');
const rateLimiter = require('./src/middleware/rateLimiter');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
});

// Trust Render/proxy reverse proxy
app.set('trust proxy', 1);

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rate limiter
app.use('/api/', rateLimiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), uptime: process.uptime() });
});

// Routes
app.use('/api/analytics', analyticsRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/email', emailRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  });
});

// Initialize services and start server
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    await getRedisClient();
    initSocketManager(io);
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 WebSocket ready`);
      console.log(`📊 Analytics API: http://localhost:${PORT}/api/analytics`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown — lets nodemon restart cleanly without EADDRINUSE
const shutdown = () => {
  server.close(() => {
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

module.exports = { app, io };
