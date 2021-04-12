const express = require("express");
const path = require(`path`);

const { Router } = express;
const router = new Router();

const session = require("./session");

/////////////////////////////////////
//
const carModel = require("./carModel");
const car = require("./car");
const garage = require("./garage");
const findMyCar = require("./findMyCar");

router.use("/api/car-models", carModel);
router.use("/api/cars", car);
router.use("/api/garages", garage);
router.use("/api/find-my-cars", findMyCar);

router.use("/api/sessions", session);

module.exports = router;
