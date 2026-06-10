const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const auth = require("./middleware/auth");

dotenv.config();

const app = express();

app.use(express.json());

const user = {
  id: 1,
  username: "john",
  password: "123456"
};

app.post("/login", (req, res) => {
  const { username, password } =
    req.body;

  if (
    username !== user.username ||
    password !== user.password
  ) {
    return res.status(401).json({
      message: "Invalid credentials"
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h"
    }
  );

  res.json({ token });
});

app.get("/profile", auth, (req, res) => {
  res.json({
    message: "Profile Data",
    user: req.user
  });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on ${process.env.PORT}`
  );
});