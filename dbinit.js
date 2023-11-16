const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    dbName: "amate",
  });
  console.log(`MongoDB connected to ${conn.connection.name}`);
};

module.exports = connectDB;
