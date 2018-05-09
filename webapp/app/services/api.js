import ApolloClient from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';

import envConfig from 'env-config';


const httpLink = new HttpLink({
  uri: `${envConfig.baseURL}`,
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:5000/subscriptions',
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
