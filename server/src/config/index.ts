import dotenv from 'dotenv';

import { Environment, IConfig, IServerConfig, ServerProtocol } from './config.types';

class Config implements IConfig { 
    public docs: boolean;
    public env: Environment;  
    public server: IServerConfig;

    constructor () {
        dotenv.config();
        this.loadEnvironmentVariables();
    }

    private loadEnvironmentVariables () {
        this.docs = Boolean(process.env.NODE_DOCS || false);
        this.env = Environment[(process.env.NODE_ENV || Environment.development) as keyof typeof Environment];
        this.server = {
            host: (process.env.NODE_HOST || 'localhost'),
            port: Number(process.env.NODE_PORT || 8080),
            protocol: ServerProtocol[(process.env.NODE_PROTOCOL || ServerProtocol.http) as keyof typeof ServerProtocol],
        }
    }
}

export * from './config.types';
export default Config;