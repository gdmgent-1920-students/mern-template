export enum Environment {
    development = 'development',
    local = 'local',
    production = 'production',
	staging = 'staging',
	test = 'test',
}

export enum ServerProtocol {
    http = 'http',
    https = 'https',
}

export interface IServerConfig {
    host: string;
    port: number;
    protocol: ServerProtocol;
}

export interface IConfig {
    env: Environment,
    docs: boolean,
    server: IServerConfig,
}