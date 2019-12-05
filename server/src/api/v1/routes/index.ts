import { default as express, Application, Router } from 'express';
import { HelloController } from '../controllers';
import { SQLDatabase } from 'src/services';

export default class ApiV1Router {
    public router: Router;
    public helloController: HelloController;

    constructor (services: { sqlDatabase: SQLDatabase }) {
        this.helloController = new HelloController();

        this.router = express.Router();
        this.registerRoutes();
    }

    private registerRoutes (): void {
        this.router.get('/hello', this.helloController.index);
    }
}