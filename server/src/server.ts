import { default as http, createServer, Server } from 'http';

import { IConfig } from './config/config.types';
import App from './app';

export default class HttpServer {
    private config: IConfig;
    private httpServer: Server;
    private app: App;

    constructor(config: IConfig) {
        this.config = config;
        this.app = new App();
        this.httpServer = createServer(this.app.app);
        this.httpServer.on('error', (err: any) => {
            if (err.code === 'EADDRINUSE') {
              setTimeout(() => {
                this.stop();
                this.start();
              }, 1000);
            }
        });
    }

    public start (): void {
        this.httpServer.listen( 
            {
                port: this.config.server.port,
                host: this.config.server.host
            }, (err?: Error) => {
                console.log('RUNNING');
                if (err) {
                    this.gracefulShutdown(err);
                }
            }
        );
    }

    public stop (): void {
        this.httpServer.close((err?: Error) => {
            this.gracefulShutdown(err);
        });
    }

    private gracefulShutdown (err?: Error): void {
        if (err) {
            return process.exit(1);
        }
        process.exit();
    }
}