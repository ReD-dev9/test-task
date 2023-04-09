import express, { Express } from 'express';
import { json } from "body-parser";
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from "@apollo/server/express4";
import 'dotenv/config';
import http from 'http';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const port = process.env.PORT;

const app: Express = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const startApp = async () => {
    await server.start();
    app.use(
        '/graphql',
        json(),
        expressMiddleware(server),
    );
    await new Promise<void>((resolve) => {
        httpServer.listen({ port }, () => {
            console.log(`🚀 Server ready at http://localhost:${port}`);
            resolve();
        });
    });
    return { server, app };
};

startApp();