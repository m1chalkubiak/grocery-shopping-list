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
    active TINYINT DEFAULT 1,
    FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE
  );
  
  INSERT INTO lists (id, name) VALUES (1, 'breakfast');
  INSERT INTO lists (id, name) VALUES (2, 'dinner');

  INSERT INTO list_items (list_id, name, active) VALUES (1, 'bread', 1); 
  INSERT INTO list_items (list_id, name, active) VALUES (1, 'milk', 0); 
  INSERT INTO list_items (list_id, name, active) VALUES (1, 'eggs', 1); 
  INSERT INTO list_items (list_id, name, active) VALUES (1, 'cereal', 0); 
  INSERT INTO list_items (list_id, name, active) VALUES (1, 'butter', 0); 
  INSERT INTO list_items (list_id, name, active) VALUES (1, 'ham', 1); 
  
  
  INSERT INTO list_items (list_id, name, active) VALUES (2, 'potatoes', 1);
  INSERT INTO list_items (list_id, name, active) VALUES (2, 'chicken', 1);
  INSERT INTO list_items (list_id, name, active) VALUES (2, 'carrot', 0);
  INSERT INTO list_items (list_id, name, active) VALUES (2, 'oil of olives', 1);
 
`, function(err, results) {
  if (err) throw err;

  console.log('Migration success!');
});

connection.end();