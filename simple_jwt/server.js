const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const auth = require("./middleware/auth");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());

/*
  USERS
*/
const users = [
  { id: 1, username: "admin", password: "123", role: "Admin" },
  { id: 2, username: "manager", password: "123", role: "Manager" },
  { id: 3, username: "user", password: "123", role: "User" }
];

/*
  REFRESH TOKEN STORE
*/
let refreshTokens = [];

/*
  ACCESS TOKEN
*/
function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );
}

/*
  REFRESH TOKEN
*/
function generateRefreshToken(user) {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
}

/*
  LOGIN
*/
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  refreshTokens.push(refreshToken);

  res.json({ accessToken, refreshToken });
});

/*
  PROFILE (TEST AUTH)
*/
app.get("/profile", auth, (req, res) => {
  res.json({
    message: "Profile data",
    user: req.user
  });
});

/*
  REFRESH TOKEN
*/
app.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const user = users.find(u => u.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAccessToken = generateAccessToken(user);

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: "Expired refresh token" });
  }
});

/*
  LOGOUT
*/
app.post("/logout", (req, res) => {
  const { refreshToken } = req.body;

  refreshTokens = refreshTokens.filter(t => t !== refreshToken);

  res.json({ message: "Logged out" });
});

/*
  PRODUCT ROUTES
*/
app.use(productRoutes);

/*
  START SERVER
*/
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});