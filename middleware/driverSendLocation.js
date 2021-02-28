const { validationResult } = require("express-validator");
const db = require("../db/auth");

const sendLocation = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "failure",
        reason: errors.array({ onlyFirstError: true })[0].msg,
      });
      return;
    }

    let { id } = req.params;
    let { latitude, longitude } = req.body;

    let driver = await db.Drivers.findOneAndUpdate(
      { id },
      {
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      }
    );

    if (!driver)
      return res
        .status(400)
        .json({ status: "failure", reason: "This user id in not used" });

    next();
  } catch (err) {
    console.log(`TEST DRIVER SEND LOCATION ERROE: ${err.message}`);
    return res.status(500).json({ status: "failure", reason: err.message });
  }
};

module.exports = sendLocation;
