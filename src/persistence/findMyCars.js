const sql = require("sql-template-strings");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const db = require("./db");

module.exports = {
  //////////////////////
  // READ - find-my-car
  async find(registrationNumber) {
    const { rows } = await db.query(sql`
    SELECT carModel.model, carModel.color, carModel.productionYear, car.registrationNumber, car.owner, garage.address FROM car
    INNER JOIN garage ON garage.licencePlate=car.registrationNumber
    INNER JOIN carModel ON carModel.model=car.CarModel
    WHERE car.registrationNumber=${registrationNumber};
    `);
    return rows[0];
  },
};
