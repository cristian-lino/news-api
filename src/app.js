const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const middleware = require('./middlewares/auth')

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
app.use(cors())

//routes
app.post('/auth', SessionController.create)

app.use(middleware.auth)

app.post('/users', UsersController.create)
app.post('/channel', ChannelController.create)
app.get('/channel/:id', ChannelController.show)
app.put('/channelUserLike/:channelId', ChannelUserLikesController.updateLike)
app.get('/channel', ChannelController.index)
app.post('/news', NewsController.create)
app.get('/users', UsersController.index)
app.get('/users/:id', UsersController.show)

module.exports = app;