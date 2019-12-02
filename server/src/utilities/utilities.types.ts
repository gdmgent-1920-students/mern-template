export enum Logging {
  default = 'default',
  error = 'error',
  silent = 'silent',
	verbose = 'verbose',
}

export enum LoggLevel {
  cronn = 'cron',
  debug = 'debug',
  error = 'error',
  info = 'info',
	warning = 'warning',
}

export interface ILogger {
  logging: Logging;
  info (msg: string, obj: object): void;
  error (msg: string, obj: object): void;
  log (level: string, msg: string, obj: object): void;
}