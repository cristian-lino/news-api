const express = require('express')
const bodyParser = require('body-parser')
const UsersController = require('./controllers/UserController')
const SystemRolesController = require('./controllers/SystemRoleController')
const GeneralPermissionsController = require('./controllers/GeneralPermissionController')
const SessionController = require('./controllers/SessionController')

const app = express()
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

//routes
app.post('/auth', SessionController.create)

app.get('/users', UsersController.index)
app.get('/users/:id', UsersController.show)
app.post('/users', UsersController.create)
app.put('/users/:id', UsersController.update)
app.delete('/users/:id', UsersController.destroy)

app.get('/roles', SystemRolesController.index)
app.get('/roles/:id', SystemRolesController.show)
app.post('/roles', SystemRolesController.create)
app.put('/roles/:id', SystemRolesController.update)
app.delete('/roles/:id', SystemRolesController.destroy)

app.get('/permissions', GeneralPermissionsController.index)
app.get('/permissions/:id', GeneralPermissionsController.show)
app.post('/permissions', GeneralPermissionsController.create)
app.put('/permissions/:id', GeneralPermissionsController.update)
app.delete('/permissions/:id', GeneralPermissionsController.destroy)

module.exports = app;