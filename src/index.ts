import { ApolloServer } from '@apollo/server';
import { AppDataSource } from './data-source';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import * as http from 'http';
import * as cors from 'cors';
import * as express from 'express';
import { resolvers } from './resolvers';
import { schema } from './schemas';

const port = 3000;

const app = express();

AppDataSource.initialize().then(async () => {
    console.log('connected to the database...');
}).catch(error => console.log(error));

async function startServer() {
    const httpServer = http.createServer(app)
    const server = new ApolloServer({
        typeDefs: schema,
        rootValue: resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    })
    await server.start()

    app.use(express.json())

    // Graphql Entry point
    app.use(
        '/graphql',
        cors(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req, res }) => ({
                // Add optional configuration options
                request: req,
                response: res,
            }),
        })
    )

    httpServer.listen(port, () => {
        console.log(`server started on ${port}!`)
    })
}

startServer();
