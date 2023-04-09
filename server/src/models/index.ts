import { Sequelize } from 'sequelize';
import process from 'process';
import 'dotenv/config';
import config from '../config/db';
import TaskModel from './Tasks';
const env = process.env.NODE_ENV || 'development';

const db = new Sequelize(config[env].database, config[env].username, config[env].password, {
    host: config[env].host,
    port: +config[env].port,
    dialect: config[env].dialect,
});

[TaskModel].forEach((model) => {
    model(db);
});

export default db;
