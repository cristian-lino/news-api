const { Sequelize, DataTypes } = require('sequelize');
const database = require('../database/index');

const GeneralPermission = database.define('general_permissions', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    screen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    allow_read: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    allow_create: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    allow_edit: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    allow_delete: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = GeneralPermission;
