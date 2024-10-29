const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/test.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      nickname TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      sirname TEXT)
  `);

  db.run('DELETE FROM USERS;');

  db.run(`
    INSERT INTO USERS (nickname, name, sirname)       
    VALUES ('murom', 'Илья','Муромец'),
          ('pop','Алеша', 'Попович'),
          ('dobriy','Добрыня', 'Никитич'),
          ('yaga', 'Баба', 'Яга'),
          ('aquatic', 'Водяной','');
  `);

  db.all("SELECT * FROM users", (err, rows) => {
      console.log(rows);
  });
});