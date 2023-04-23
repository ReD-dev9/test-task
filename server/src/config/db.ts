import { IDataBase } from './const';
import 'dotenv/config';

const db = {
    development: {
        username: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DB,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        dialect: 'postgres',
        seederStorage: 'sequelize',
    },
    test: {
        username: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DB,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        dialect: 'postgres',
        seederStorage: 'sequelize',
    },
    production: {
        username: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DB,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        dialect: 'postgres',
        seederStorage: 'sequelize',
    },
} as IDataBase;

export default db;