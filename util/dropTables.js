const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "user",
  host: "postgres",
  database: "db",
  password: "pass",
  port: 5432,
});

const carModel = `
DROP TABLE carModel;
`;

const car = `
DROP TABLE car;
`;

const garage = `
DROP TABLE garage;
`;

const dropCarModel = pool.query(carModel, (err, res) => {
  console.log(err, res);
  // pool.end();
});

const dropCar = pool.query(car, (err, res) => {
  console.log(err, res);
  // pool.end();
});

const dropGarage = pool.query(garage, (err, res) => {
  console.log(err, res);
  // pool.end();
});

exports.dropCarModel = dropCarModel;
exports.dropCar = dropCar;
exports.dropGarage = dropGarage;
