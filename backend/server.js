const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import configurations and utilities
const logger = require('./src/utils/logger');
const { connectSupabase } = require('./src/config/database');

// Import routes
const vehicleRoutes = require('./src/routes/vehicle');
const emailRoutes = require('./src/routes/email');
const smsRoutes = require('./src/routes/sms');
const companyRoutes = require('./src/routes/company');
const carRoutes = require('./src/routes/cars');
const bidRoutes = require('./src/routes/bids');
const favoriteRoutes = require('./src/routes/favorites');
const dashboardRoutes = require('./src/routes/dashboard');
const statusRoutes = require('./src/routes/status');
const dealerRoutes = require('./src/routes/dealers');

const app = express();
const PORT = process.env.PORT || 8001;

// Trust proxy - required for Vercel/behind reverse proxy
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGINS === '*' 
    ? true 
    : process.env.CORS_ORIGINS 
      ? process.env.CORS_ORIGINS.split(',')
      : true, // Allow all origins if not specified
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes default
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// API Routes - all routes are prefixed with /api to match Kubernetes ingress rules
app.use('/api/status', statusRoutes);
app.use('/api/vehicle', vehicleRoutes);
app.use('/api', emailRoutes);
app.use('/api', smsRoutes);
app.use('/api', companyRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/dealers', dealerRoutes);

// Health check endpoint
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Kaggi Node.js Backend API',
    version: '1.0.0',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint for load balancer
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Global error handler
app.use((error, req, res, next) => {
  logger.error('Global error handler:', error);
  
  // Handle validation errors
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details || error.message
    });
  }
  
  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
  
  // Handle Supabase errors
  if (error.code && error.message) {
    return res.status(500).json({
      success: false,
      message: 'Database error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
  
  // Default error response
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

// Initialize database connection and start server
async function startServer() {
  try {
    // Test Supabase connection (optional in serverless)
    try {
      await connectSupabase();
      logger.info('Database connection established');
    } catch (dbError) {
      logger.warn('Database connection failed, will retry on demand:', dbError.message);
    }
    
    // Start server
    app.listen(PORT, '0.0.0.0', () => {
      logger.info(`🚀 Kaggi Node.js Backend started on port ${PORT}`);
      logger.info(`🌍 Environment: ${process.env.NODE_ENV}`);
      logger.info(`📊 Health check available at http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

module.exports = app;