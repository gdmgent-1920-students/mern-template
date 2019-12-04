import { default as express, Application, Router } from 'express';
import HelloController from '../controllers/hello.controller';

export default class ApiV1Router {
    public router: Router;
    public helloController: HelloController;

    constructor () {
        this.helloController = new HelloController();

        this.router = express.Router();
        this.registerRoutes();
    }

    private registerRoutes (): void {
        this.router.get('/hello', this.helloController.index);
    }
}