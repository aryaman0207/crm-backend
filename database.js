const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./tickets.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ticket_id TEXT UNIQUE,
      customer_name TEXT,
      customer_email TEXT,
      subject TEXT,
      description TEXT,
      status TEXT DEFAULT 'Open',
      created_at DATETIME,
      updated_at DATETIME
    )
  `);
 db.run(`
CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_id TEXT,
  note_text TEXT,
  created_at TEXT
)
`);
  db.run(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ticket_id TEXT,
      note_text TEXT,
      created_at DATETIME
    )
  `);
});

module.exports = db;