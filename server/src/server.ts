import { default as http, createServer } from 'http';

import { IConfig } from './config';
import { ILogger } from './utilities';
import App from './app';

export default class Server {
    private config: IConfig;
    private logger: ILogger;
    private httpServer: http.Server;
    private app: App;

    constructor (config: IConfig, logger: ILogger) {
        this.config = config;
        this.logger = logger;

        this.app = new App(config, logger);
        this.httpServer = createServer(this.app.app);
        this.httpServer.on('error', (err: any) => {
            if (err.code === 'EADDRINUSE') {
              this.logger.error('Address already in use', err);
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
            this.logger.info(`Server is listening on ${this.config.server.host}:${this.config.server.port}`, {});
            if (err) {
              this.logger.error(`Could not start the server on ${this.config.server.host}:${this.config.server.port}`, err);
              this.gracefulShutdown(err);
            }
          }
        );
    }

    public stop (): void {
        this.httpServer.close((err?: Error) => {
          this.logger.info(`Server is stopped on ${this.config.server.host}:${this.config.server.port}`, err || {});
          this.gracefulShutdown(err);
        });
    }

    private gracefulShutdown (err?: Error): void {
        if (err) {
          this.logger.info(`Server is graceful shutdown!`, err || {});
          return process.exit(1);
        }
        process.exit();
    }
}