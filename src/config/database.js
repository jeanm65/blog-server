const mongoose = require("mongoose");

const initDataBase = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/blogko");
    console.log("connected to database");
  } catch (error) {
    console.log("mongoose error:", error);
  }
};

module.exports = initDataBase;
