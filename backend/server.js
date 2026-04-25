const express = require("express");
const app = express();
app.use(express.json());

let users = [];

// Signup
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password, balance: 100 });
  res.send("User created");
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) res.send(user);
  else res.status(401).send("Invalid");
});

// Play Game
app.post("/play", (req, res) => {
  const { username, bet } = req.body;
  const user = users.find(u => u.username === username);

  if (!user || user.balance < bet) {
    return res.status(400).send("Low balance");
  }

  user.balance -= bet;

  const win = Math.random() > 0.5;
  if (win) user.balance += bet * 2;

  res.send({ win, balance: user.balance });
});

app.listen(3000, () => console.log("Server running"));
