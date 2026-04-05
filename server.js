const express = require("express");
const mysql = require("mysql2");

const app = express();

// بيانات الداتابيز بتاعتك (من InfinityFree)
const db = mysql.createConnection({
  host: "sql200.infinityfree.com",
  user: "if0_41584453",
  password: "Omar13101993",
  database: "if0_41584453_Elshaf3y"
});

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

      // check status
      if (row.status !== "active") {
        return res.send("banned");
      }

      // check expiry
      if (new Date(row.expiry_date) < new Date()) {
        return res.send("expired");
      }

      return res.send("success");
    } else {
      return res.send("invalid");
    }
  });
});

// مهم جدا عشان Railway
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
