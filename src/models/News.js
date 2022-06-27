const { Sequelize, DataTypes } = require('sequelize');
const database = require('../database/index');

const News = database.define('news', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hasImage: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    image_path: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    channel_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = News;