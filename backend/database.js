const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./barberagem.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    sobrenome TEXT,
    celular TEXT,
    email TEXT UNIQUE,
    nascimento TEXT,
    senha TEXT
  )`);
});

module.exports = db;
