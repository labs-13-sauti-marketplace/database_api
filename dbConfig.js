const knex = require('knex');

const dbEngine = process.env.ENVIRONMENT || 'development';

const knexConfigy = require('../knexfile');

module.exports = knex(knexConfigy[dbEngine]);
