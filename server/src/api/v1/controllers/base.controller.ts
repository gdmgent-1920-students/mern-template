import { Response, Request } from 'express';
import { SQLDatabase } from 'src/services';

export default abstract class BaseController {
    protected sqlDatabase: SQLDatabase;

    constructor (services: { sqlDatabase: SQLDatabase }) {
        this.sqlDatabase = services.sqlDatabase;
    }

    public static jsonResponse (res: Response, code: number, message: string) {
        return res.status(code).json({ message });
    }

    public clientError (res: Response, message?: string) {
        BaseController.jsonResponse(res, 400, message || 'Unauthorized');
    }

    public unauthorized (res: Response, message?: string) {
        BaseController.jsonResponse(res, 401, message || 'Unauthorized');
    }

    public paymentRequired (res: Response, message?: string) {
        BaseController.jsonResponse(res, 402, message || 'Payment required');
    }

    public forbidden (res: Response, message?: string) {
        BaseController.jsonResponse(res, 403, message || 'Forbidden');
    }

    public notFound (res: Response, message?: string) {
        BaseController.jsonResponse(res, 404, message || 'Not found');
    }

    public conflict (res: Response, message?: string) {
        BaseController.jsonResponse(res, 409, message || 'Conflict');
    }

    public tooManyRequest (res: Response, message?: string) {
        BaseController.jsonResponse(res, 429, message || 'Too many requests');
    }

    public fail (res: Response, error: Error | string) {
        BaseController.jsonResponse(res, 500, error.toString());
    }

    public ok<T> (res: Response, dto?: T) {
        return (!!dto) ? (res.status(200).json(dto)) : (res.sendStatus(200));
    }
}