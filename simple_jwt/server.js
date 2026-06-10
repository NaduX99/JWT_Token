const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const auth = require("./middleware/auth");

dotenv.config();

const app = express();

app.use(express.json());


// Mock User
const user = {
  id: 1,
  username: "john",
  password: "123456"
};



let refreshTokens = [];


// Generate Access Token
function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "15m"
    }
  );
}


// Generate Refresh Token
function generateRefreshToken(user) {
  return jwt.sign(
    {
      id: user.id
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d"
    }
  );
}


// Login Route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username !== user.username ||
    password !== user.password
  ) {
    return res.status(401).json({
      message: "Invalid credentials"
    });
  }

  const accessToken =
    generateAccessToken(user);

  const refreshToken =
    generateRefreshToken(user);

  refreshTokens.push(refreshToken);

  res.json({
    accessToken,
    refreshToken
  });
});



app.get(
  "/profile",
  auth,
  (req, res) => {
    res.json({
      message: "Protected Profile",
      user: req.user
    });
  }
);


// Refresh Token Route
app.post(
  "/refresh-token",
  (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token required"
      });
    }

    if (
      !refreshTokens.includes(
        refreshToken
      )
    ) {
      return res.status(403).json({
        message: "Refresh token not found"
      });
    }

    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
      );

      const accessToken =
        generateAccessToken({
          id: decoded.id,
          username: user.username
        });

      res.json({
        accessToken
      });
    } catch (error) {
      return res.status(403).json({
        message:
          "Invalid or expired refresh token"
      });
    }
  }
);


// Logout Route
app.post("/logout", (req, res) => {
  const { refreshToken } = req.body;

  refreshTokens =
    refreshTokens.filter(
      token => token !== refreshToken
    );

  res.json({
    message: "Logged out successfully"
  });
});


//Server
app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port ${process.env.PORT}`
  );
});