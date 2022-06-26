const { Sequelize, DataTypes } = require('sequelize');
const database = require('../config/database');

const ChannelUserLikes = database.define('channel_user_likes', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    channel_id: {
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

module.exports = ChannelUserLikes;