const { Pool } = require("pg");

const pool = new Pool({
  user: "user",
  host: "postgres",
  database: "db",
  password: "pass",
  port: 5432,
});

const tables = `
CREATE TABLE IF NOT EXISTS carModel (
    id uuid PRIMARY KEY,
    model text UNIQUE,
    color text,
    productionYear int
);

CREATE INDEX carModel_model on carModel (model);

CREATE TABLE IF NOT EXISTS car (
  id uuid PRIMARY KEY,
  registrationNumber text UNIQUE,
  carModel text,
  owner text,
  FOREIGN KEY (carModel) REFERENCES carModel(model) ON DELETE CASCADE
  );
  
  CREATE INDEX car_registrationNumber on car (registrationNumber);
  
  CREATE TABLE IF NOT EXISTS garage (
    id uuid PRIMARY KEY,
    address text,
    licencePlate text,
    FOREIGN KEY (licencePlate) REFERENCES car(registrationNumber) ON DELETE CASCADE
  );

  CREATE INDEX garage_licencePlate on garage (licencePlate);
  CREATE INDEX garage_address on garage (address);
`;

const createTables = pool.query(tables, (err, res) => {
  console.log(err, res);
  // pool.end();
});

exports.createTables = createTables;