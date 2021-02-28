const mongoose = require("mongoose");

const { Schema } = mongoose;

const driver = new Schema(
  {
    id: { type: Number, default: 0, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: "phone_number must be 10 digit number!",
      },
    },
    license_number: { type: String, required: true, unique: true },
    car_number: { type: String, required: true, unique: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    collection: "Drivers",
    versionKey: false,
    timestamps: false,
  }
);

module.exports = driver;
