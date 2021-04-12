/* eslint-disable camelcase */

const db = require("../persistence/db");

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS carModel (
    id uuid PRIMARY KEY,
    model text,
    color text,
    productionYear int
  );

 `);

  //   await client.query(`
  //   CREATE INDEX carModels_model on carModels (model);

  //   CREATE INDEX sessions_carModel on sessions (carModel_id);
  //   `);

  await client.release(true);
  next();
};

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE carModel;
  `);

  await client.release(true);
  next();
};
