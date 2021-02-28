const router = require("express").Router();
const validate = require("../util/bodyValidation").validate;
const nearbyCars = require("../middleware/nearbyCars");

router.post(
  "/available_cars",
  validate("available_cars"),
  nearbyCars,
  (req, res) => {
    res.status(200).json(req.res);
  }
);

module.exports = router;
