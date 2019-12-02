import { createLogger, format, transports } from 'winston';

import { ILogger, Logging, LoggLevel } from './utilities.types';
import winston = require('winston');

export default class Logger implements ILogger { 
  public logging: Logging;
  public logger: winston.Logger;

  constructor () {
    const {
        align, combine, colorize, timestamp, printf,
    } = format;

    this.logger = createLogger({
      format: combine(
        colorize(),
        timestamp(),
        align(),
        printf((info) => {
            const {
                timestamp: tstamp, level, message, ...args
            } = info;

            const ts = tstamp.slice(0, 19).replace('T', ' ');
            return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
        }),
      ),
      transports: [
          new transports.Console(),
          new transports.File({ filename: './error.log', level: 'error' }),
          new transports.File({ filename: './info.log', level: 'info' }),
      ],
      exitOnError: false,
    });
  }

  public log (level: string, msg: string, obj: object, force = false) {
    this.logger.log(level, msg, { object: obj, timestamp: new Date().toISOString() });
  }

  public info (msg: string, obj: object, force = false) {
    this.logger.log(LoggLevel.info, msg, obj, force);
  }

  public error (msg: string, obj: object, force = false) {
    this.logger.log(LoggLevel.error, msg, obj, force);
  }
}