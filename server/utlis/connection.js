import mysql from 'mysql';


class Connection {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'shopping_list',
      database: 'shopping_list',
    });
    this.connection.connect();
  }

  queryOne(sql) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result[0]);
      })
    });
  }

  queryList(sql) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      })
    });
  }

  end() {
    this.connection.end();
  }
}

export default new Connection();