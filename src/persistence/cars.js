const sql = require("sql-template-strings");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const db = require("./db");

module.exports = {
  //////////////////////
  // CREATE - create new
  async create(carModel, owner, registrationNumber) {
    try {
      const { rows } = await db.query(sql`
      INSERT INTO car (id, registrationNumber, carModel, owner)
        VALUES (${uuidv4()},${registrationNumber},${carModel}, ${owner})
        RETURNING registrationNumber;
        `);

      const [car] = rows;
      return car;
    } catch (error) {
      if (error.constraint === "car_registrationNumber_key") {
        return null;
      }
      throw error;
    }
  },

  //////////////////////
  // READ - all records
  async showAll() {
    const { rows } = await db.query(sql`
    SELECT * FROM car;
    `);
    return rows;
  },

  //////////////////////
  // READ - find
  async find(registrationNumber) {
    const { rows } = await db.query(sql`
    SELECT * FROM car WHERE registrationNumber=${registrationNumber};
    `);
    return rows[0];
  },

  //////////////////////
  // UPDATE - car
  async update(registrationNumber, carModel, owner) {
    const { rows } = await db.query(sql`
    UPDATE car SET carModel=${carModel}, owner=${owner} WHERE registrationNumber=${registrationNumber} RETURNING *;
    `);
    return rows[0];
  },

  //////////////////////
  // DELETE - car
  async delete(registrationNumber) {
    const { rows } = await db.query(sql`
    DELETE FROM car WHERE registrationNumber=${registrationNumber} RETURNING *;
    `);
    return rows[0];
  },

  //////////////////////
  // READ - find-my-car
  async findMyCar(registrationNumber) {
    const { rows } = await db.query(sql`
    SELECT carModel.model, carModel.color, carModel.productionYear, car.registrationNumber, car.owner, garage.address FROM car
    INNER JOIN garage ON garage.licencePlate=car.registrationNumber
    INNER JOIN carModel ON carModel.model=car.CarModel
    WHERE car.registrationNumber=${registrationNumber};
    `);
    return rows[0];
  },
};
