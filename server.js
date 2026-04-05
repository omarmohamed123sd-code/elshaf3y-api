const express = require("express");
const mysql = require("mysql");

const app = express();

// 🔥 بيانات الداتا بيز بتاعتك
const db = mysql.createConnection({
    host: "sql200.infinityfree.com",
    user: "ifo_41584453",
    password: "Omar13101993",
    database: "ifo_41584453_Elshaf3y"
});

// اتصال الداتا بيز
db.connect(err => {
    if (err) {
        console.log("DB Error:", err);
    } else {
        console.log("Connected to DB ✅");
    }
});

// 🔐 API Login
app.get("/login", (req, res) => {
    const user = req.query.user;
    const pass = req.query.pass;

    if (!user || !pass) {
        return res.send("empty");
    }

    db.query(
        "SELECT * FROM users WHERE username=? AND password=?",
        [user, pass],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.send("error");
            }

            if (result.length > 0) {
                let acc = result[0];

                // ❌ banned
                if (acc.status === "banned") {
                    return res.send("banned");
                }

                // ⏳ expired
                let today = new Date();
                let expire = new Date(acc.expiry_date);

                if (today > expire) {
                    return res.send("expired");
                }

                // ✅ success
                return res.send("success");
            } else {
                return res.send("wrong");
            }
        }
    );
});

// تشغيل السيرفر
app.listen(3000, () => {
    console.log("Server running 🚀");
});