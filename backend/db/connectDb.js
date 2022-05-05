const mongoose = require("mongoose");
const db = "mongodb://localhost:27017/Ecomm";
const connectDb = async () => {
  try {
    await mongoose.connect(db);
    console.log("Mongodb conneted");
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = connectDb;
