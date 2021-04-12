const { json } = require("body-parser");
const { Router } = require("express");
const Garage = require("../persistence/garages");

const router = new Router();

//////////////////////
// CREATE - create new
router.post("/", async (request, response, next) => {
  try {
    const { address, licencePlate } = request.body;
    if (!address || !licencePlate) {
      return response.status(400).json({
        message: "Address and Licence Plate must be provided",
      });
    }

    const garage = await Garage.create(address, licencePlate);
    if (!garage) {
      return response.status(400).json({ message: "Garage already exists" });
    }

    return response.status(200).json(address);
  } catch (error) {
    console.error(
      `createGarage({ licencePlate: ${request.body.licencePlate} }) >> Error: ${error.stack}`
    );
    response.status(500).json();
  }
});

//////////////////////
// READ - all records
router.get("/", async (request, response, next) => {
  const allRecords = await Garage.showAll();
  response.status(200).json(allRecords);
});

//////////////////////
// READ - find
router.get("/:licencePlate", async (request, response, next) => {
  try {
    const { licencePlate } = request.params;
    const garage = await Garage.find(licencePlate);
    if (garage) {
      return response.status(200).json(garage);
    } else {
      return response
        .status(200)
        .json({ message: "Garage for requested car not found" });
    }
  } catch (error) {
    console.error(
      `Find Car Model({ address: ${request.body.address} }) >> Error: ${error.stack}`
    );
  }
  response.status(500).json();
});

//////////////////////////
// UPDATE - garage address
router.patch("/:licencePlate", async (request, response, next) => {
  try {
    // const { address } = request.params;
    const { address, licencePlate } = request.body;

    const findGarage = await Garage.find(licencePlate);

    if (findGarage) {
      const updatedGarage = await Garage.update(address, licencePlate);

      return response.status(200).json({ message: "Garage Updated" });
    } else {
      return response.status(200).json({
        message:
          "Requested Garage not found and it couldn't be updated, but entered from the beginning!",
      });
    }
  } catch (error) {
    console.error(
      `Update Garage({ address: ${request.body.address} }) >> Error: ${error.stack}`
    );
  }
  response.status(500).json();
});

//////////////////////
// DELETE - garage
router.delete("/:licencePlate", async (request, response, next) => {
  try {
    const { licencePlate } = request.params;
    const deleteGarage = await Garage.delete(licencePlate);
    if (deleteGarage) {
      return response.status(200).json({ message: "Garage Deleted" });
    } else {
      return response.status(200).json({
        message:
          "Garage for requested car not found and it couldn't be deleted",
      });
    }
  } catch (error) {
    console.error(
      `Delete Garage({ licencePlate: ${request.body.licencePlate} }) >> Error: ${error.stack}`
    );
  }
  response.status(500).json();
});

module.exports = router;
