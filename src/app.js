const express = require('express')
const bodyParser = require('body-parser')
const UsersController = require('./controllers/UserController')
const SystemRolesController = require('./controllers/SystemRoleController')
const GeneralPermissionsController = require('./controllers/GeneralPermissionController')
const SessionController = require('./controllers/SessionController')
const ChannelController = require('./controllers/ChannelController')
const NewsController = require('./controllers/NewsController')
const ChannelUserLikesController = require('./controllers/ChannelUserLikesController')

const app = express()
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

//routes
app.post('/auth', SessionController.create)
app.post('/users', UsersController.create)
app.post('/channel', ChannelController.create)
app.get('/channel/:id', ChannelController.show)
app.put('/channelUserLike/:channelId', ChannelUserLikesController.updateLike)
app.get('/channel/loggedUser/:userId', ChannelController.indexUser)
app.post('/news', NewsController.create)
app.get('/users', UsersController.index)

module.exports = app;