const express = require("express");
const mysql = require("mysql2");

const app = express();

// الاتصال بالداتا بيز
const db = mysql.createConnection({
  host: "sql200.infinityfree.com",
  user: "if0_41584453",
  password: "Omar13101993",
  database: "if0_41584453_Elshaf3y"
});

db.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB Connected");
  }
});

// API
app.get("/api", (req, res) => {
  const user = req.query.user || "";
  const pass = req.query.pass || "";

  const sql = "SELECT * FROM users WHERE username=? AND password=?";

  db.query(sql, [user, pass], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("db_error");
    }

    if (result.length > 0) {
      const row = result[0];

      if (row.status !== "active") {
        return res.send("banned");
      }

      if (new Date(row.expiry_date) < new Date()) {
        return res.send("expired");
      }

      return res.send("success");
    } else {
      return res.send("invalid");
    }
  });
});

// 🔥 أهم سطر
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
