import mysql from 'mysql';
import { path } from 'ramda'
import { PubSub } from 'graphql-subscriptions';


class Connection {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'mysql',
      user: 'root',
      password: 'shopping_list',
      database: 'shopping_list',
      multipleStatements: true,
    });
    this.pubSub = new PubSub();
    this.connection.connect();
  }

  query(sql, resultPosition = []) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(path(resultPosition, result));
      })
    });
  }

  end() {
    this.connection.end();
  }
}

export default new Connection();