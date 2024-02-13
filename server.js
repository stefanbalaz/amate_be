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
const partnerRoutes = require("./routes/partner");
const productRoutes = require("./routes/product");
const merchantRoutes = require("./routes/merchant");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/order", orderRoutes);
app.use("/sign-up", partnerRoutes);
/* app.use("/partner", partnerRoutes); */
app.use("/product", productRoutes);
app.use("/merchant", merchantRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
