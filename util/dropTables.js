const { Pool } = require("pg");

const pool = new Pool({
  user: "user",
  host: "postgres",
  database: "db",
  password: "pass",
  port: 5432,
});

// DROP TABLE carModel CASCADE;
// DROP TABLE car CASCADE;
// DROP TABLE garage;
const tables = `
DROP TABLE carModel CASCADE;
DROP TABLE car CASCADE;
DROP TABLE garage;
`;

const dropTables = pool.query(tables, (err, res) => {
  console.log(err, res);
  // pool.end();
});

exports.dropTables = dropTables;
