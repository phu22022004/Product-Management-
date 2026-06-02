const mongoose = require("mongoose");
module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connect to MongoDB successfully!");
  } catch (error) {
    console.log("Connect to MongoDB failed!");
  }
};
