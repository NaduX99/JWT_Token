const express =
  require("express");

const dotenv =
  require("dotenv");

const connectDB =
  require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(
  "/api/auth",
  require(
    "./routes/authRoutes"
  )
);

app.get("/", (req, res) => {
  res.send(
    "JWT Authentication API Running"
  );
});

app.listen(
  process.env.PORT,
  () => {
    console.log(
      `Server running on port ${process.env.PORT}`
    );
  }
);