const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "./tickets.db",
  (err) => {
    if (err) {
      console.error(
        "Database connection error:",
        err.message
      );
    } else {
      console.log(
        "Connected to SQLite Database"
      );
    }
  }
);

/* ==========================
   TICKETS TABLE
========================== */

db.run(`
CREATE TABLE IF NOT EXISTS tickets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_id TEXT UNIQUE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'Open',
  created_at TEXT,
  updated_at TEXT
)
`);

/* ==========================
   NOTES TABLE
========================== */

db.run(`
CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_id TEXT NOT NULL,
  note_text TEXT NOT NULL,
  created_at TEXT
)
`);

module.exports = db;