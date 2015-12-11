var fs = require('fs');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_ADAPTER_SEQUELIZE,
    pool: 25
  }
);


// load all models


