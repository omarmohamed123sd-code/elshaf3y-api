const express = require("express");
const app = express();

const users = [
  { user: "omar", pass: "123", expire: "2026-12-31" }
];

app.get("/", (req, res) => {
  res.send("Server Working ✅");
});

app.get("/login", (req, res) => {
  const { user, pass } = req.query;

  const u = users.find(x => x.user === user && x.pass === pass);

  if (!u) return res.send("invalid");

  const today = new Date();
  const expire = new Date(u.expire);

  if (today > expire) return res.send("expired");

  res.send("success");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
