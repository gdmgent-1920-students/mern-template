import { NextFunction, Response, Request } from 'express';

import BaseController from "./base.controller";


export default class HelloController extends BaseController {
  constructor () {
    super();
  }

  public index (req: Request, res: Response, next: NextFunction): void {
    res.status(200).json({ message: 'Hello' });
  }
}