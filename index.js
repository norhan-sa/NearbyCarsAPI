const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routers/apiRoutes");
const app = express();
const db = require("./db/auth");

async function startServer() {
  try {
    await db.startDB();

    app.use(cors());
    app.use(express.json());
    app.use("/api/v1", apiRoutes);
    app.get("/", async (req, res) => {
      let driver = new db.Drivers({
        name: "testtest",
        email: "teee99@gmail.com",
        phone_number: 1731587891,
        license_number: "1144456",
        car_number: "1114657",
        latitude: 2.58
      });
      let test = await driver.save();
      console.log(driver.toObject({ getters: true }));
      res.send(test);
    });

    let port = process.env.PORT || 5050;
    app.listen(port, (err, res) => {
      console.log(`Listening to port : ${port} ...`);
    });
  } catch (err) {
    console.log(`Fitness server failed to start: ${err.message}`);
  }
}

startServer();
