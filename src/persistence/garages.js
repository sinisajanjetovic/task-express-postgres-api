const sql = require("sql-template-strings");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const db = require("./db");

module.exports = {
  //////////////////////
  // CREATE - create new
  async create(address, licencePlate) {
    try {
      const { rows } = await db.query(sql`
      INSERT INTO garage (id, address, licencePlate)
        VALUES (${uuidv4()},${address}, ${licencePlate})
        RETURNING address;
        `);

      const [garage] = rows;
      return garage;
    } catch (error) {
      if (error.constraint === "garage_address_key") {
        return null;
      }
      throw error;
    }
  },

  //////////////////////
  // READ - all records
  async showAll() {
    const { rows } = await db.query(sql`
    SELECT * FROM garage;
    `);
    return rows;
  },

  //////////////////////
  // READ - find
  async find(address) {
    const { rows } = await db.query(sql`
    SELECT * FROM garage WHERE address=${address};
    `);
    return rows[0];
  },

  //////////////////////
  // UPDATE - garage
  async update(address, licencePlate) {
    const { rows } = await db.query(sql`
    UPDATE garage SET licencePlate=${licencePlate} WHERE address=${address} RETURNING *;
    `);
    return rows[0];
  },

  //////////////////////
  // DELETE - garage
  async delete(address) {
    const { rows } = await db.query(sql`
    DELETE FROM garage WHERE address=${address} RETURNING *;
    `);
    return rows[0];
  },
};
