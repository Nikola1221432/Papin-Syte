const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync(path.join(__dirname, 'notes.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS health_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS repose_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

const insertHealthName = db.prepare('INSERT INTO health_notes (name) VALUES (?)');
const insertReposeName = db.prepare('INSERT INTO repose_notes (name) VALUES (?)');

function insertNames(table, names) {
  const statement = table === 'health' ? insertHealthName : insertReposeName;
  for (const name of names) {
    statement.run(name);
  }
}

module.exports = { insertNames };
