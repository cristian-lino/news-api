const { Sequelize, DataTypes } = require('sequelize');
const database = require('../config/database');

const User = database.define('users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

module.exports = User;