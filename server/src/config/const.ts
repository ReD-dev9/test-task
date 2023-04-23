import { Dialect } from 'sequelize';
export interface IDataBase {
    [name: string]: {
        username: string,
        password: string,
        database: string,
        host: string,
        port: string,
        dialect: Dialect,
        seederStorage: string,
    };
}
