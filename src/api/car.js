const { json } = require("body-parser");
const { Router } = require("express");
const Car = require("../persistence/cars");

const router = new Router();

//////////////////////
// CREATE - create new
router.post("/", async (request, response, next) => {
  try {
    const { carModel, owner, registrationNumber } = request.body;
    if (!carModel || !owner || !registrationNumber) {
      return response.status(400).json({
        message: "Car Model, Owner and Registration Number must be provided",
      });
    }

    const car = await Car.create(carModel, owner, registrationNumber);
    if (!car) {
      return response.status(400).json({ message: "Car already exists" });
    }

    return response.status(200).json(car);
  } catch (error) {
    console.error(
      `createCar({ carRegistrationNumber: ${request.body.carRegistrationNumber} }) >> Error: ${error.stack}`
    );
    response.status(500).json();
  }
});

//////////////////////
// READ - all records
router.get("/", async (request, response, next) => {
  const allRecords = await Car.showAll();
  if (allRecords) {
    response.status(200).json(allRecords);
  } else {
    response.status(200).json({ message: "No records in table Car" });
  }
});

//////////////////////
// READ - find
router.get("/:registrationNumber", async (request, response, next) => {
  try {
    const { registrationNumber } = request.params;
    const car = await Car.find(registrationNumber);
    if (car) {
      return response.status(200).json(car);
    } else {
      return response.status(200).json({ message: "Requested Car not found" });
    }
  } catch (error) {
    console.error(
      `Find Car ({ car: ${request.body.registrationNumber} }) >> Error: ${error.stack}`
    );
  }
  response.status(500).json();
});

//////////////////////
// UPDATE - car
router.patch("/:registrationNumber", async (request, response, next) => {
  try {
    // const { carModel } = request.params;
    const { registrationNumber, carModel, owner } = request.body;

    const findCar = await Car.find(registrationNumber);

    if (findCar) {
      const updatedCar = await Car.update(registrationNumber, carModel, owner);

      return response.status(200).json({ message: "Car Updated" });
    } else {
      return response.status(200).json({
        message:
          "Requested Car not found and it couldn't be updated, but entered from the beginning!",
      });
    }
  } catch (error) {
    console.error(
      `Update Car ({ registrationNumber: ${request.body.registrationNumber} }) >> Error: ${error.stack}`
    );
  }
  response.status(500).json();
});

//////////////////////
// DELETE - car
router.delete("/:registrationNumber", async (request, response, next) => {
  try {
    const { registrationNumber } = request.params;
    const deleteCar = await Car.delete(registrationNumber);
    console.log(deleteCar);
    if (deleteCar) {
      return response.status(200).json({ message: "Car Deleted" });
    } else {
      return response.status(200).json({
        message: "Requested Car not found and it couldn't be deleted",
      });
    }
  } catch (error) {
    console.error(
      `Delete Car Model({ registrationNumber: ${request.body.registrationNumber} }) >> Error: ${error.stack}`
    );
  }
  response.status(500).json();
});

//////////////////////
// READ - find-my-car
router.get(
  "/find-my-car/:registrationNumber",
  async (request, response, next) => {
    try {
      const { registrationNumber } = request.params;
      const car = await Car.findMyCar(registrationNumber);
      if (car) {
        return response.status(200).json(car);
      } else {
        return response
          .status(200)
          .json({ message: "Requested Car not found" });
      }
    } catch (error) {
      console.error(
        `Find Car ({ car: ${request.body.registrationNumber} }) >> Error: ${error.stack}`
      );
    }
    response.status(500).json();
  }
);

module.exports = router;
