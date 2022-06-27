require('dotenv').config();

const secret = process.env.APP_SECRET
const expiresIn = "7d"

module.exports = {secret, expiresIn};