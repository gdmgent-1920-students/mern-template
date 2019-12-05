import { default as express } from "express";
import { default as bodyParser } from 'body-parser';
import { default as chalk } from 'chalk';
import { default as cookieParser } from 'cookie-parser';
import { default as cors } from 'cors';
import { default as helmet } from 'helmet';
import { default as moment }  from 'moment';
import { default as morgan }  from 'morgan';
import { default as path }  from 'path';

import { Environment, IConfig } from './config';
import { ILogger } from './utilities';
import { default as AppRouter } from "./routes";

export default class App {
  public app: express.Application;
  private config: IConfig;
  private logger: ILogger;
  public appRouter: AppRouter;
  
  constructor (config: IConfig, logger: ILogger) {
    this.config = config;
    this.logger = logger;

    this.app = express();

    this.loadExpressMiddleware();
    this.loadMorganMiddleware();
    this.loadCorsMiddleware();
    this.loadRoutes();
  }

  loadExpressMiddleware () {
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
		this.app.use(bodyParser.json({ limit: '50mb' }));

    this.app.use(cookieParser());
    
    this.app.set('views', path.join(__dirname, 'views')); 
    this.app.set('view engine', 'ejs');
    if (this.config.env === Environment.production) {
      this.app.use(express.static(path.join(__dirname, 'client')));
    } else {
      this.app.use(express.static(path.join(__dirname, '/../../client/build')));
    }

		this.app.use(helmet.hidePoweredBy());
		this.app.use(helmet.ieNoOpen());
		this.app.use(helmet.noSniff());
		this.app.use(helmet.xssFilter());
  }

  loadMorganMiddleware () {
    if (this.config.env === Environment.development) {
      const morganMiddleware = morgan((tokens, req, res) => {
        return [
          chalk.hex('#ffffff').bold(`${moment(tokens.date(req, res)).format('YYYY-MM-DD hh:mm:ss')}`),
          chalk.hex('#34ace0').bold(`[${tokens.method(req, res)}]`),
          ':\t',
          chalk.hex('#ff5252').bold(`[${tokens.url(req, res)}]`),
          chalk.hex('#f78fb3').bold(`[${tokens.status(req, res)}]`),
          chalk.hex('#fffff').bold(`${tokens['response-time'](req, res)}ms`),
          chalk.hex('#fffff').bold(tokens['remote-addr'](req, res)),
          '',
        ].join(' ');
      }); 
      this.app.use(morganMiddleware);
    }
  }

  loadCorsMiddleware () {
    const corsOptions = {
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      exposedHeaders: ['x-auth-token'],
    };
    this.app.use(cors(corsOptions));
  }

  loadRoutes () {
      this.appRouter = new AppRouter(this.app);
  }
}