import { NextFunction, Response, Request } from 'express';

import BaseController from "./base.controller";
import { SQLDatabase } from 'src/services';


export default class HelloController extends BaseController {
  constructor (service: { sqlDatabase: SQLDatabase }) {
    super(services);
  }

  public index (req: Request, res: Response, next: NextFunction): void {
    res.status(200).json({ message: 'Hello' });
  }
}