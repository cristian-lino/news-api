const { Sequelize, DataTypes } = require('sequelize');
const database = require('../database/index');

const NewsUserLike = database.define('news_users_likes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    channel_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    news_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    like: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

module.exports = NewsUserLike;