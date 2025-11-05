const winston = require('winston');

// Determine if running in serverless environment (Vercel)
const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;

const transports = [];

// In serverless, only use console logging (file system is read-only)
if (isServerless || process.env.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  );
} else {
  // In traditional server, use file logging
  transports.push(
    new winston.transports.File({ filename: '/var/log/supervisor/backend-nodejs.log', level: 'info' }),
    new winston.transports.File({ filename: '/var/log/supervisor/backend-nodejs-error.log', level: 'error' })
  );
  
  // Also add console for non-production
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  );
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'kaggi-backend' },
  transports
});

module.exports = logger;