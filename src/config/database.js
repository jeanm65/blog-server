const mongoose = require("mongoose");

const initDataBase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("connected to database:", process.env.DB_URL);
  } catch (error) {
    console.log("mongoose error:", error);
  }
};

module.exports = initDataBase;
