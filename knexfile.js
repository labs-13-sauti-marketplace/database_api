// Update with your config settings.

const localPg = {
  host: "localhost",
  database: "database_api",
  port: 5432,
  user: "postgres",
  password: "00Fire00"
};


//const dbConnection = process.env.DATABASE_URL || localPg;

const dbSettings = {
  client: "pg",
  connection: localPg,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: "./migrations",
    tableName: "dbmigrations"
  },
  seeds: {
    directory: "./seeds"
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
    directory: "./migrations",
    tableName: "dbmigrations"
  },
  seeds: {
    directory: "./seeds"
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
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    }
  }
};
