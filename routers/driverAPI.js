const router = require("express").Router();
const validate = require("../util/bodyValidation").validate;
const regester = require("../middleware/driverRegester");
const sendLocation = require("../middleware/driverSendLocation");

router.post("/register", validate("register"), regester, (req, res) => {
  res.status(201).json(req.data);
});

router.post(
  "/:id/sendLocation",
  validate("sendLocation"),
  sendLocation,
  (req, res) => {
    res.status(202).json({ status: "success" });
  }
);

module.exports = router;
