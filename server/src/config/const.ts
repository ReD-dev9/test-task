import { Dialect } from 'sequelize';
export interface IDataBase {
    [name: string]: {
        username: string | undefined,
        password: string | undefined,
        database: string | undefined,
        host: string | undefined,
        port: string | undefined,
        dialect: Dialect,
        seederStorage: string,
    };
}
