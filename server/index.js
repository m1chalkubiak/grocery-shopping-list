import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema';
import resolvers from './resolvers';
import cleanup from './utlis/cleanup';

const myGraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
const PORT = 5000;

const app = express();

// bodyParser is needed just for POST.
app.use('/api', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/api' })); // if you want GraphiQL enabled

const server = createServer(app);

server.listen(PORT, () => {
  new SubscriptionServer({
    execute,
    subscribe,
    schema: myGraphQLSchema,
  }, {
    server: server,
    path: '/subscriptions',
  });
});

cleanup();
