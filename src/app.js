const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const middleware = require("./middlewares/auth");

const UsersController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");
const ChannelController = require("./controllers/ChannelController");
const NewsController = require("./controllers/NewsController");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

//routes
app.post('/auth', SessionController.create)
app.post('/users', UsersController.create)

app.use(middleware.auth);

app.post('/channel', ChannelController.create)
app.post('/news', NewsController.create)
app.put('/news/:id', NewsController.update)
app.get('/channel', ChannelController.index)
app.get('/channel/:id', ChannelController.show)

module.exports = app;
