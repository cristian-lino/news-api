const { Sequelize, DataTypes } = require('sequelize');
const database = require('../database/index');

const SystemRole = database.define('system_roles', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = SystemRole;