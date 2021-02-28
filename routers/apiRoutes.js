const router = require("express").Router();
const driverAPI = require("./driverAPI");
const passengerAPI = require("./passengerAPI");

router.use("/driver", driverAPI);
router.use("/passenger", passengerAPI);

module.exports = router;
