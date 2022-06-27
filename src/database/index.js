const config = require('../config/database');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.url, {dialect: 'postgres'});

module.exports = sequelize;