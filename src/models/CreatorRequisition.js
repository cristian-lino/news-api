const { Sequelize, DataTypes } = require('sequelize');
const database = require('../database/index');

const CreatorRequisition = database.define('creator_requisitions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = CreatorRequisition;