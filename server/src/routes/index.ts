import { Application, Router } from 'express';

import ApiV1Router from '../api/v1/routes';

export class AppRouter {
    private app: Application;
    private apiV1Router: ApiV1Router;

    constructor (app: Application) {
        this.app = app;
        this.apiV1Router = new ApiV1Router();
        this.registerRoutes();
    }

    private registerRoutes (): void {
        this.app.use('/api/v1', this.apiV1Router.router);
    }
}