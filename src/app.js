const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const middleware = require("./middlewares/auth");

const UsersController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");
const ChannelController = require("./controllers/ChannelController");
const NewsController = require("./controllers/NewsController");
const CreatorRequisitionController = require("./controllers/CreatorRequisitionController");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

//routes
app.post("/auth", SessionController.create);
app.post("/users", UsersController.create);

app.use(middleware.auth);

app.post("/channel", ChannelController.create);
app.delete("/channel/:id", ChannelController.destroy);
app.post("/news", NewsController.create);
app.put("/news/:id", NewsController.update);
app.get("/channel", ChannelController.index);
app.get("/channel/:id", ChannelController.show);
app.get("/users/:id", UsersController.show);
app.post("/requisitions", CreatorRequisitionController.create);
app.get("/requisitions", CreatorRequisitionController.index);
app.put("/requisitions/:id", CreatorRequisitionController.update);

module.exports = app;
