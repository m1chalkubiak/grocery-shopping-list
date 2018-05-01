import Item from './item';
import List from './list';

export default `
  ${Item}
  
  ${List}
  
  type Query {
    lists: [List]
    list(id: Int!): List
    item(id: Int!): Item
  }

  schema {
    query: Query
  }
`;
