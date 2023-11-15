const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const connectDB = require("./dbinit");
connectDB();
app.use(cors());
const { Pool, Client } = require("pg");
const pool = new Pool();
app.use(express.json());
require("colors");
const orderRoutes = require("./routes/order");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/order", orderRoutes);
app.use("/partner", orderRoutes);
app.use("/product", orderRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
