import { createConnection, Connection } from "typeorm";

import Config, { Environment, IConfig } from '../config';
import Logger, { ILogger } from '../utilities';

import { Post } from "../models";

export class Database {
  private config: IConfig;
  private logger: ILogger;
  public connection: Connection;

  constructor (config: IConfig, logger: ILogger) {
    this.config = config;
    this.logger = logger;

  }

  public async connect (): Promise<void> {
    this.connection = await createConnection({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "test",
      password: "test",
      database: "test",
      entities: [Post]
    });
  }
}