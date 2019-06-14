require("dotenv").config();
const pg = require("pg");
pg.defaults.ssl = true;

const dbConnection = process.env.DATABASE_URL || localPg;

//refactor section of code

module.exports = {
  production: {
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
    },
  },
  development:{
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
    },
  },
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
    },
  },
}
