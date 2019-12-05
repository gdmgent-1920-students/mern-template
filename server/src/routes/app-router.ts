import { Application, Router } from 'express';

import ApiV1Router from '../api/v1/routes';
import { SQLDatabase } from 'src/services';

export default class AppRouter {
    private app: Application;
    private apiV1Router: ApiV1Router;

    constructor (app: Application, services: { sqlDatabase: SQLDatabase }) {
        this.app = app;
        this.apiV1Router = new ApiV1Router(services);
        this.registerRoutes();
    }

    private registerRoutes (): void {
        this.app.use('/api/v1', this.apiV1Router.router);
    }
}