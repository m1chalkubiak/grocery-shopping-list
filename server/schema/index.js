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
  
  type Mutation {
    toggleItemActive(id: Int!, value: Boolean!): Item
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
