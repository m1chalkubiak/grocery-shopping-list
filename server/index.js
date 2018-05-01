import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
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

app.listen(PORT);

cleanup();
