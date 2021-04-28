const db = require('../persistence/db');

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS car (
    registrationNumber text PRIMARY KEY,
    carModel text,
    owner text,
    FOREIGN KEY (carModel) REFERENCES carModel(model) ON DELETE CASCADE
    );
    
    CREATE INDEX car_registrationNumber on car (registrationNumber);
  `);

  await client.release(true);
  next()
}

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE car;
  `);

  await client.release(true);
  next()
}
