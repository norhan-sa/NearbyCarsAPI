const config = require("dotenv").config();
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const driver = require("../models/driver");

const startDB = async () => {
  console.log("Test Database Auth: connecting to test DB...");
  try {
    const connection = await mongoose.createConnection(process.env.DB, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    
    autoIncrement.initialize(connection);
    driver.plugin(autoIncrement.plugin, { model: "Drivers", field: "id" });
    driver.index({ "location": "2dsphere" });

    const Drivers = connection.model("Drivers", driver);

    console.log("Test Database CONNECTED");
    module.exports.Drivers = Drivers;
  } catch (err) {
    throw err;
  }
};

module.exports.startDB = startDB;
