require("dotenv").config();
const pg = require("pg");
pg.defaults.ssl = true;

//const dbConnection = process.env.DATABASE_URL || localPg;

const dbSettings = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: "./data/migrations",
    tableName: "dbmigrations"
  },
  seeds: {
    directory: "./data/seeds"
  }
};
const dbSettings2 = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: "./data/migrations",
    tableName: "dbmigrations"
  },
  seeds: {
    directory: "./data/seeds"
  }
};

module.exports = {
  development: dbSettings,
  production: dbSettings2,
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/test.db3"
    },
    useNullAsDefault: true,

    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
