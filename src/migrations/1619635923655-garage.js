const db = require('../persistence/db');

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS garage (
    address text,
    licencePlate text PRIMARY KEY,
    FOREIGN KEY (licencePlate) REFERENCES car(registrationNumber) ON DELETE CASCADE
  );

  CREATE INDEX garage_licencePlate on garage (licencePlate);
  CREATE INDEX garage_address on garage (address);
  `);

  await client.release(true);
  next()
}

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE garage;
  `);

  await client.release(true);
  next()
}
