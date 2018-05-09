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
    createList(name: String!): List
    toggleItemActive(id: Int!, value: Boolean!): Item
  }
  
  type Subscription {
    itemUpdated: Item
    listCreated: List
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;
