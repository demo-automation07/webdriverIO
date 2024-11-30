import winston from 'winston';
import { addStep } from '@wdio/allure-reporter';

class LoggerHelper {
  constructor() {
    this.logger = this.createLogger(); // Initialize logger when an instance of LoggerHelper is created
  }

  /**
   * @description Creates and configures the logger using Winston.
   * @returns {winston.Logger} Configured winston logger instance.
   * @throws {Error} Throws error if logger creation fails.
   */
  createLogger() {
    try {
      // Create and configure the logger
      return winston.createLogger({
        level: 'info', // Default log level set to 'info'
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp to logs
          winston.format.colorize(), // Colorize the console output for better readability
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
              winston.format.simple() // Simple format for console logs
            ),
          }),
          // File transport for logging to a file
          new winston.transports.File({
            filename: './logs/test.log', // Specify file to store logs
            level: 'info', // Log level for file logging
            maxsize: 5242880, // Max file size of 5MB for each log file
            maxFiles: 5, // Keep only the last 5 log files
            format: winston.format.combine(
              winston.format.timestamp(), // Add timestamp for file logs
              winston.format.simple() // Simple format for file logs
            ),
          }),
        ],
      });
    } catch (error) {
      // Error handling during logger creation
      console.error("Error creating logger:", error);
      throw new Error('Logger creation failed');
    }
  }

  /**
   * @description Logs an informational message with an optional label and adds it to Allure report as a step.
   * @param {string} message - The message to be logged.
   * @param {string} [label] - Optional label for the log message.
   * @returns {void}
   * @throws {Error} Throws error if logging fails.
   */
  logInfo(message, label) {
    try {
      // Log info message to the logger
      this.logger.info(message, { label });
      // Add step to Allure report
      addStep(message, { label });
      // Also log to the console
      console.log(message, { label });
    } catch (error) {
      console.error("Error logging info:", error);
      throw new Error('Error logging info message');
    }
  }

  /**
   * @description Logs an error message with an optional label.
   * @param {string} message - The error message to be logged.
   * @param {string} [label] - Optional label for the log message.
   * @returns {void}
   * @throws {Error} Throws error if logging fails.
   */
  logError(message, label) {
    try {
      // Log error message to the logger
      this.logger.error(message, { label });
      addStep(message, { label });
      console.log(message, { label });
    } catch (error) {
      console.error("Error logging error message:", error);
      throw new Error('Error logging error message');
    }
  }

  /**
   * @description Logs a warning message with an optional label.
   * @param {string} message - The warning message to be logged.
   * @param {string} [label] - Optional label for the log message.
   * @returns {void}
   * @throws {Error} Throws error if logging fails.
   */
  logWarn(message, label) {
    try {
      // Log warning message to the logger
      this.logger.warn(message, { label });
      addStep(message, { label });
      console.log(message, { label });
    } catch (error) {
      console.error("Error logging warning message:", error);
      throw new Error('Error logging warning message');
    }
  }

  /**
   * @description Logs a debug message with an optional label.
   * @param {string} message - The debug message to be logged.
   * @param {string} [label] - Optional label for the log message.
   * @returns {void}
   * @throws {Error} Throws error if logging fails.
   */
  logDebug(message, label) {
    try {
      // Log debug message to the logger
      this.logger.debug(message, { label });
    } catch (error) {
      console.error("Error logging debug message:", error);
      throw new Error('Error logging debug message');
    }
  }
}

const loggerHelper = new LoggerHelper();

export const logInfo = (message, label) => {
  loggerHelper.logInfo(message, label);
};

export const logError = (message, label) => {
  loggerHelper.logError(message, label);
};

export const logWarn = (message, label) => {
  loggerHelper.logWarn(message, label);
};