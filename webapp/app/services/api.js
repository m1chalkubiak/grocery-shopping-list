import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import envConfig from 'env-config';

export default new ApolloClient({
  link: new HttpLink({ uri: `${envConfig.baseURL}/api` }),
  cache: new InMemoryCache(),
});
