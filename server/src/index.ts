import nodemon from 'nodemon';

import Config from './config';
import { IConfig } from './config/config.types';
import HttpServer from './server';

const config: IConfig = new Config();

const server: HttpServer = new HttpServer(config);
server.start();

function stopAllProcesses () {
    nodemon.emit('quit');
    server.stop();
}

process.on('SIGINT', () => stopAllProcesses());
process.on('SIGTERM', () => stopAllProcesses());