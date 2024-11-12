import winston from 'winston';
import { addStep } from '@wdio/allure-reporter';

export default class LoggerHelper {
  constructor() {
    this.logger = this.createLogger();
  }

  // Create and configure the logger
  createLogger() {
    return winston.createLogger({
      level: 'info', // Default log level
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp to logs
        winston.format.colorize(), // Colorize the console output
        winston.format.printf(({ timestamp, level, message, label }) => {
          // Custom log format
          return `[${timestamp}] ${label ? `[${label}]` : ''} ${level}: ${message}`;
        })
      ),
      transports: [
        // Console transport for logging to the console
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(), // Colorize console output
            winston.format.simple() // Simplified format for console
          ),
        }),
        // File transport for logging to a file
        new winston.transports.File({
          filename: 'logs/test.log', // File to store logs
          level: 'info', // Log level for file logging
          maxsize: 5242880, // Max size of 5MB for each log file
          maxFiles: 5, // Keep only the last 5 log files
          format: winston.format.combine(
            winston.format.timestamp(), // Add timestamp for file logs
            winston.format.simple() // Simple format for file logs
          ),
        }),
      ],
    });
  }

  // Custom function to log with a specific label (e.g., 'Login Page', 'Test Suite')
  logInfo(message, label) {
    this.logger.info(message, { label });
    addStep(message, { label }); // Using addStep from Allure
    console.log(message, { label });
  }

  // Custom function for logging errors
  logError(message, label) {
    this.logger.error(message, { label });
  }

  // Custom function for logging warnings
  logWarn(message, label) {
    this.logger.warn(message, { label });
  }

  // Custom function for logging debug messages
  logDebug(message, label) {
    this.logger.debug(message, { label });
  }
}

