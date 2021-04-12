const { json } = require("body-parser");
const { Router } = require("express");
const CarModel = require("../persistence/carModels");

const router = new Router();

//////////////////////
// CREATE - create new
router.post("/", async (request, response, next) => {
  try {
    const { model, color, productionYear } = request.body;
    if (!model || !color || !productionYear) {
      return response.status(400).json({
        message: "Car Model, Color and Year of Production must be provided",
      });
    }

    const carModel = await CarModel.create(model, color, productionYear);
    if (!carModel) {
      return response.status(400).json({ message: "Car Model already exists" });
    }

    return response.status(200).json(model);
  } catch (error) {
    console.error(
      `createCarModel({ model: ${request.body.model} }) >> Error: ${error.stack}`
    );
    response.status(500).json();
  }
});

//////////////////////
// READ - all records
router.get("/", async (request, response, next) => {
  const allRecords = await CarModel.showAll();
  response.status(200).json(allRecords);
});

//////////////////////
// READ - find
router.get("/:model", async (request, response, next) => {
  try {
    const { model } = request.params;
    const carModel = await CarModel.find(model);
    if (carModel) {
      return response.status(200).json(carModel);
    } else {
      return response
        .status(200)
        .json({ message: "Requested Car Model not found" });
    }
  } catch (error) {
    console.error(
      `Find Car Model({ model: ${request.body.model} }) >> Error: ${error.stack}`
    );
  }
  response.status(500).json();
});

//////////////////////
// UPDATE - model
router.patch("/:model", async (request, response, next) => {
  try {
    // const { model } = request.params;
    const { model, color, productionYear } = request.body;

    const findCarModel = await CarModel.find(model);

    if (findCarModel) {
      const updatedCarModel = await CarModel.update(
        model,
        color,
        productionYear
      );

      return response.status(200).json({ message: "Car Model Updated" });
    } else {
      return response.status(200).json({
        message:
          "Requested Car Model not found and it couldn't be updated, but entered from the beginning!",
      });
    }
  } catch (error) {
    console.error(
      `Update Car Model({ model: ${request.body.model} }) >> Error: ${error.stack}`
    );
  }
  response.status(500).json();
});

//////////////////////
// DELETE - model
router.delete("/:model", async (request, response, next) => {
  try {
    const { model } = request.params;
    const deleteCarModel = await CarModel.delete(model);
    console.log(deleteCarModel);
    if (deleteCarModel) {
      return response.status(200).json({ message: "Car Model Deleted" });
    } else {
      return response.status(200).json({
        message: "Requested Car Model not found and it couldn't be deleted",
      });
    }
  } catch (error) {
    console.error(
      `Delete Car Model({ model: ${request.body.model} }) >> Error: ${error.stack}`
    );
  }
  response.status(500).json();
});

module.exports = router;
