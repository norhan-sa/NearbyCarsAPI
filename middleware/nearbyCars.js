const { validationResult } = require("express-validator");
const db = require("../db/auth");

const nearbyCars = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "failure",
        reason: errors.array({ onlyFirstError: true })[0].msg,
      });
      return;
    }

    let { latitude, longitude } = req.body;

    let drivers = await db.Drivers.find(
      {
        location: {
          $near: {
            $geometry: { type: "Point", coordinates: [longitude, latitude] },
            $maxDistance: 4000,
          },
        },
      },
      "-_id name car_number phone_number"
    );

    let res;
    if (drivers.length === 0)
      res = {
        message: "No cabs available!",
      };
    else
      res = {
        available_cabs: drivers,
      };

    req.res = res;

    next();
  } catch (err) {
    console.log(`TEST GET NEARBY CARS ERROE: ${err.message}`);
    return res.status(500).json({ status: "failure", reason: err.message });
  }
};

module.exports = nearbyCars;
