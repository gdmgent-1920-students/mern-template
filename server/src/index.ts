import nodemon from 'nodemon';

import Config, { Environment, IConfig } from './config';
import { SQLDatabase } from './services';
import Server from './server';
import Logger, { ILogger } from './utilities';

const config: IConfig = new Config();
const logger: ILogger = new Logger();

const database: SQLDatabase = new SQLDatabase(config, logger);

const server: Server = new Server(config, logger);
server.start();

function stopAllProcesses () {
  if (config.env === Environment.development) {
    nodemon.emit('quit');
  }  
  server.stop();
}

process.on('SIGINT', () => stopAllProcesses());
process.on('SIGTERM', () => stopAllProcesses());