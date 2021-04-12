const { json } = require("body-parser");
const { Router } = require("express");
const FindMyCar = require("../persistence/findMyCars");

const router = new Router();

//////////////////////
// READ - find-my-car
router.get("/:registrationNumber", async (request, response, next) => {
  try {
    const { registrationNumber } = request.params;
    const findCar = await FindMyCar.find(registrationNumber);
    if (findCar) {
      return response.status(200).json(findCar);
    } else {
      return response.status(200).json({ message: "Searched Car not found" });
    }
  } catch (error) {
    console.error(
      `Find Car ({ car: ${request.body.registrationNumber} }) >> Error: ${error.stack}`
    );
  }
  response.status(500).json();
});

module.exports = router;
