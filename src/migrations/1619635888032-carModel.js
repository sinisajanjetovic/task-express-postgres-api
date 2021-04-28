const db = require("../persistence/db");

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS carModel (
    model text PRIMARY KEY,
    color text,
    productionYear int);

    CREATE INDEX carModel_model on carModel (model);
  `);

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
