const { validationResult } = require("express-validator");
const db = require("../db/auth");

const regester = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "failure",
        reason: errors.array({ onlyFirstError: true })[0].msg,
      });
      return;
    }

    let { name, email, phone_number, license_number, car_number } = req.body;

    let isUsedEmail = await db.Drivers.findOne({
      email: email,
    });
    if (isUsedEmail)
      return res.status(400).send({
        status: "failure",
        reason: "this email is already used",
      });

    let isUsedPhone = await db.Drivers.findOne({
      phone_number: phone_number,
    });
    if (isUsedPhone)
      return res.status(400).send({
        status: "failure",
        reason: "this phone_number is already used",
      });

    let isUsedLicense = await db.Drivers.findOne({
      license_number: license_number,
    });
    if (isUsedLicense)
      return res.status(400).send({
        status: "failure",
        reason: "this license_number is already used",
      });

    let isUsedCar = await db.Drivers.findOne({
      car_number: car_number,
    });
    if (isUsedCar)
      return res.status(400).send({
        status: "failure",
        reason: "this car_number is already used",
      });

    let driver = new db.Drivers({
      name: name,
      email: email,
      phone_number: phone_number,
      license_number: license_number,
      car_number: car_number,
    });

    driver = await driver.save();

    driver = driver.toObject({ getters: true });
    delete driver._id;

    req.data = driver;

    next();
  } catch (err) {
    console.log(`TEST REGESTER ERROE: ${err.message}`);
    return res.status(500).json({ status: "failure", reason: err.message });
  }
};

module.exports = regester;
