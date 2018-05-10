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
    removeItem(id: Int!): Boolean
    updateItem(id: Int!, name: String!): Item
    createItem(name: String!, listId: Int!): Item
  }
  
  type Subscription {
    itemCreated: Item
    itemUpdated: Item
    itemRemoved: ID
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;