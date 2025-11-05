const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'kaggi-backend' },
  transports: [
    // Write all logs to `combined.log`
    new winston.transports.File({ filename: '/var/log/supervisor/backend-nodejs.log', level: 'info' }),
    new winston.transports.File({ filename: '/var/log/supervisor/backend-nodejs-error.log', level: 'error' })
  ],
});

// If not in production, also log to console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

module.exports = logger;