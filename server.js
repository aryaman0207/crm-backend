const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ticket API Running");
});

/* ==========================
   CREATE TICKET
========================== */

app.post("/api/tickets", (req, res) => {
  const {
    customer_name,
    customer_email,
    subject,
    description
  } = req.body;

  const ticketId = "TKT-" + Date.now();
  const timestamp = new Date().toISOString();

  db.run(
    `
    INSERT INTO tickets
    (
      ticket_id,
      customer_name,
      customer_email,
      subject,
      description,
      status,
      created_at,
      updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      ticketId,
      customer_name,
      customer_email,
      subject,
      description,
      "Open",
      timestamp,
      timestamp
    ],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      res.json({
        ticket_id: ticketId,
        created_at: timestamp
      });
    }
  );
});

/* ==========================
   LIST + SEARCH + FILTER
========================== */

app.get("/api/tickets", (req, res) => {
  const { search, status } = req.query;

  let sql = "SELECT * FROM tickets WHERE 1=1";
  let params = [];

  if (status) {
    sql += " AND status = ?";
    params.push(status);
  }

  if (search) {
    sql += `
      AND (
        customer_name LIKE ?
        OR customer_email LIKE ?
        OR subject LIKE ?
        OR description LIKE ?
        OR ticket_id LIKE ?
      )
    `;

    const term = `%${search}%`;

    params.push(
      term,
      term,
      term,
      term,
      term
    );
  }

  sql += " ORDER BY created_at DESC";

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.json(rows);
  });
});

/* ==========================
   GET SINGLE TICKET
========================== */

app.get("/api/tickets/:ticketId", (req, res) => {
  const { ticketId } = req.params;

  db.get(
    `
    SELECT *
    FROM tickets
    WHERE ticket_id = ?
    `,
    [ticketId],
    (err, row) => {
      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      res.json(row);
    }
  );
});

/* ==========================
   UPDATE STATUS
========================== */

app.put("/api/tickets/:ticketId", (req, res) => {
  const { ticketId } = req.params;
  const { status } = req.body;

  const updatedAt =
    new Date().toISOString();

  db.run(
    `
    UPDATE tickets
    SET status = ?,
        updated_at = ?
    WHERE ticket_id = ?
    `,
    [
      status,
      updatedAt,
      ticketId
    ],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      res.json({
        success: true,
        updated_at: updatedAt
      });
    }
  );
});

/* ==========================
   GET NOTES
========================== */

app.get(
  "/api/tickets/:ticketId/notes",
  (req, res) => {
    const { ticketId } = req.params;

    db.all(
      `
      SELECT *
      FROM notes
      WHERE ticket_id = ?
      ORDER BY created_at DESC
      `,
      [ticketId],
      (err, rows) => {
        if (err) {
          return res.status(500).json({
            error: err.message
          });
        }

        res.json(rows);
      }
    );
  }
);

/* ==========================
   ADD NOTE
========================== */

app.post(
  "/api/tickets/:ticketId/notes",
  (req, res) => {
    const { ticketId } = req.params;
    const { note_text } = req.body;

    const createdAt =
      new Date().toISOString();

    db.run(
      `
      INSERT INTO notes
      (
        ticket_id,
        note_text,
        created_at
      )
      VALUES (?, ?, ?)
      `,
      [
        ticketId,
        note_text,
        createdAt
      ],
      function (err) {
        if (err) {
          return res.status(500).json({
            error: err.message
          });
        }

        res.json({
          success: true
        });
      }
    );
  }
);

/* ==========================
   START SERVER
========================== */

app.listen(5000, () => {
  console.log(
    "Server running on port 5000"
  );
});