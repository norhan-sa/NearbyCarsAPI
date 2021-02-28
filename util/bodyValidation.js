const { body, validator } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "register": {
      return [
        body("name")
          .exists()
          .withMessage("driver name is required")
          .isString()
          .withMessage("driver name must be String"),
        body("email")
          .exists()
          .withMessage("email must be exist")
          .trim()
          .isEmail()
          .withMessage("entered email is wrong"),
        body("phone_number")
          .exists()
          .withMessage("phone_number must be exist")
          .trim()
          .isNumeric()
          .withMessage("phone_number must be numeric")
          .bail()
          .isLength({ max: 10, min: 10 })
          .withMessage("phone_number must be 10 digits long."),
        body("license_number")
          .exists()
          .withMessage("license_number is required")
          .isString()
          .withMessage("license_number must be String"),
        body("car_number")
          .exists()
          .withMessage("car_number is required")
          .isString()
          .withMessage("car_number must be String"),
      ];
    }
    case "sendLocation": {
      return [
        body("latitude")
          .exists()
          .withMessage("latitude required")
          .isFloat()
          .withMessage("latitude must be double number"),
        body("longitude")
          .exists()
          .withMessage("longitude required")
          .isFloat()
          .withMessage("longitude must be double number"),
      ];
    }
    case "available_cars": {
      return [
        body("latitude")
          .exists()
          .withMessage("latitude required")
          .isFloat()
          .withMessage("latitude must be double number"),
        body("longitude")
          .exists()
          .withMessage("longitude required")
          .isFloat()
          .withMessage("longitude must be double number"),
      ];
    }
  }
};
