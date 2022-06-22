const express = require('express')
const bodyParser = require('body-parser')
const userC = require('./controllers/UserController')

const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

//routes
app.get('/users', userC.getUsers)

module.exports = app;