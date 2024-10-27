require("dotenv").config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
  });

const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const app = express();
const userAuthRoutes = require("./routes/userAuth-router");

app.use(cors());
app.use(express.json());

// user Auth Routes
app.use("/userAuth", userAuthRoutes);

connectDb().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log("server is running at port 5000");
  });
});
