import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'shopping_list',
  database: 'shopping_list',
  multipleStatements: true,
});
connection.connect();

connection.query(`
  DROP TABLE IF EXISTS list_items;
  DROP TABLE IF EXISTS lists;

  CREATE TABLE lists (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
  );
     
  CREATE TABLE list_items (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    list_id INT(6) UNSIGNED,
    name VARCHAR(30) NOT NULL,
    FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE
  );
  
  INSERT INTO lists (id, name) VALUES (1, 'test list');
  INSERT INTO list_items (list_id, name) VALUES (1, 'test list item'); 
 
`, function(err, results) {
  if (err) throw err;

  console.log('Migration success!');
});

connection.end();