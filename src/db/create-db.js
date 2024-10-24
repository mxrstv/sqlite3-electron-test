const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/test.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS heroes (
      id INTEGER PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT)
  `);

  db.run('DELETE FROM heroes;');

  db.run(`
    INSERT INTO heroes (first_name, last_name)       
    VALUES ('Sirius','Black'),
          ('Albus','Dumbledore'),
          ('Mundungus','Fletcher'),
          ('Rubeus','Hagrid'),
          ('Remus','Lupin'),
          ('Alastor','Moody'),
          ('James','Potter'),
          ('Lily','Potter'),
          ('Peter','Pettigrew'),
          ('Severus','Snape'), 
          ('Minerva','McGonagall'),
          ('Nymphadora','Tonks'),
          ('Kingsley','Shacklebolt'),
          ('Arthur','Weasley'),
          ('Molly','Weasley');
  `);

  db.all("SELECT * FROM heroes", (err, rows) => {
      console.log(rows);
  });
});