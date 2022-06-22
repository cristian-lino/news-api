const { DataTypes } = require('sequelize');
const database = require('../config/database');

const User = require('../models/User');

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        throw error
    }
}

module.exports = {
    getUsers
}