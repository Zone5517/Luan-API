const { Sequelize } = require('sequelize');
const dbConfig = require('./database');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port
  }
);

module.exports = sequelize;