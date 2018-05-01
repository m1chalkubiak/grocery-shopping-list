import Connection from '../utlis/connection';


const resolvers = {
  Query: {
    lists() {
      return Connection.queryList('SELECT * FROM lists');
    },
    list(_, { id }) {
      return Connection.queryOne(`SELECT * FROM lists WHERE id = ${id}`);
    },
    item(_, { id }) {
      return Connection.queryOne(`SELECT * FROM list_items WHERE id = ${id}`);
    }
  },
  List: {
    items(list) {
      return Connection.queryList(`SELECT * FROM list_items WHERE list_id = ${list.id}`);
    }
  },
  Item: {
    list(item) {
      return Connection.queryOne(`SELECT * FROM lists WHERE id = ${item.list_id}`);
    }
  }
};

export default resolvers;