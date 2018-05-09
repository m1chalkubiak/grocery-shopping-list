import Connection from '../utlis/connection';


const resolvers = {
  Query: {
    lists() {
      return Connection.query('SELECT * FROM lists');
    },
    list(_, { id }) {
      return Connection.query(`SELECT * FROM lists WHERE id = ${id}`, ['0']);
    },
    item(_, { id }) {
      return Connection.query(`SELECT * FROM list_items WHERE id = ${id}`, ['0']);
    }
  },
  Mutation: {
    createList: (_, { name }) => {
      return Connection
        .query(`
          INSERT INTO lists (name) VALUES ('${name}');
          SELECT * FROM lists WHERE id = LAST_INSERT_ID();
        `, ['1', '0'])
        .then((data) => {
          Connection.pubSub.publish('listCreated', { listCreated: data });
          return data;
        });
    },
    toggleItemActive: (_, { id, value }) => {
      return Connection
        .query(`
          UPDATE list_items SET active = ${value} WHERE id = ${id};
          SELECT * FROM list_items WHERE id = ${id};
        `, ['1', '0'])
        .then((data) => {
          Connection.pubSub.publish('itemUpdated', { itemUpdated: data });
          return data;
        });
    },
  },
  Subscription: {
    itemUpdated: {
      subscribe: () => Connection.pubSub.asyncIterator('itemUpdated')
    },
    listCreated: {
      subscribe: () => Connection.pubSub.asyncIterator('listCreated')
    },
  },
  List: {
    items(list) {
      return Connection.query(`SELECT * FROM list_items WHERE list_id = ${list.id}`);
    }
  },
  Item: {
    list(item) {
      return Connection.query(`SELECT * FROM lists WHERE id = ${item.list_id}`, ['0']);
    }
  }
};

export default resolvers;