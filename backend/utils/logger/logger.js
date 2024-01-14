import winston from "winston";
import 'winston-mongodb';
import DailyRotateFile from "winston-daily-rotate-file";

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, json } = format;

// create a custom format for logging
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const MongoDBTransport = new transports.MongoDB({
    db: process.env.MONGODB_URI,
    collection: 'logs',
    options: { 
        useUnifiedTopology: true 
    }
})

const dailyRotateTransport = new DailyRotateFile({
    filename: "logs/api-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m", // Max file size before rotation
    maxFiles: "7d", // Keep logs for 7 days
  });
  

const logger = createLogger({
    level: "debug",
    format: combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      json(),
      logFormat
    ),
    transports: [
        MongoDBTransport,
        dailyRotateTransport,
    ],
});

export default logger;