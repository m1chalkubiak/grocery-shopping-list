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
    removeItem: (_, { id }) => {
      return Connection
        .query(`
          DELETE FROM list_items WHERE id = ${id};
        `, [])
        .then((data) => {
          Connection.pubSub.publish('itemRemoved', { itemRemoved: id });
          return data;
        });
    },
    updateItem: (_, { id, name }) => {
      return Connection
        .query(`
          UPDATE list_items SET name = '${name}' WHERE id = ${id};
          SELECT * FROM list_items WHERE id = ${id};
        `, ['1', '0'])
        .then((data) => {
          Connection.pubSub.publish('itemUpdated', { itemUpdated: data });
          return data;
        });
    },
    createItem: (_, { name, listId }) => {
      return Connection
        .query(`
          INSERT INTO list_items (list_id, name, active) VALUES (${listId}, '${name}', 1);
          SELECT * FROM list_items WHERE list_id = ${listId} AND ID = (SELECT MAX(ID) FROM list_items WHERE list_id = ${listId})
        `, ['1', '0'])
        .then((data) => {
          Connection.pubSub.publish('itemCreated', { itemCreated: data });
          return data;
        });
    },
  },
  Subscription: {
    itemUpdated: {
      subscribe: () => Connection.pubSub.asyncIterator('itemUpdated')
    },
    itemRemoved: {
      subscribe: () => Connection.pubSub.asyncIterator('itemRemoved')
    },
    itemCreated: {
      subscribe: () => Connection.pubSub.asyncIterator('itemCreated')
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
