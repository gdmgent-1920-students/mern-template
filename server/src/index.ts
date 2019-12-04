import nodemon from 'nodemon';

import Config, { Environment, IConfig } from './config';
import Database, { Database } from './database';
import HttpServer from './server';
import Logger, { ILogger } from './utilities';

const config: IConfig = new Config();
const logger: ILogger = new Logger();

const database: Database = new Database(config, logger);

const server: HttpServer = new HttpServer(config, logger);
server.start();

function stopAllProcesses () {
  if (config.env === Environment.development) {
    nodemon.emit('quit');
  }  
  server.stop();
}

process.on('SIGINT', () => stopAllProcesses());
process.on('SIGTERM', () => stopAllProcesses());