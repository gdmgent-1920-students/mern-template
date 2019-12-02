import { default as express, Application } from "express";

export default class App {
    public app: Application;

    constructor () {
        this.app = express();
    }
}