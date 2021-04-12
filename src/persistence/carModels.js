const sql = require("sql-template-strings");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const db = require("./db");

module.exports = {
  //////////////////////
  // CREATE - create new
  async create(model, color, productionYear) {
    try {
      const { rows } = await db.query(sql`
      INSERT INTO carModel (id, model, color, productionYear)
        VALUES (${uuidv4()},${model}, ${color},${productionYear})
        RETURNING model;
        `);

      const [carModel] = rows;
      return carModel;
    } catch (error) {
      if (error.constraint === "carModel_model_key") {
        return null;
      }
      throw error;
    }
  },

  //////////////////////
  // READ - all records
  async showAll() {
    const { rows } = await db.query(sql`
    SELECT * FROM carModel;
    `);
    return rows;
  },

  //////////////////////
  // READ - find
  async find(model) {
    const { rows } = await db.query(sql`
    SELECT * FROM carModel WHERE model=${model};
    `);
    return rows[0];
  },

  //////////////////////
  // UPDATE - model
  async update(model, color, productionYear) {
    const { rows } = await db.query(sql`
    UPDATE carModel SET color=${color}, productionYear=${productionYear} WHERE model=${model} RETURNING *;
    `);
    return rows[0];
  },

  //////////////////////
  // DELETE - model
  async delete(model) {
    const { rows } = await db.query(sql`
    DELETE FROM carModel WHERE model=${model} RETURNING *;
    `);
    return rows[0];
  },
};
