const database = require("./database/index");
const auth = require("./services/auth");

const User = require("./models/User");
const SystemRole = require("./models/SystemRole");
const Channel = require("./models/Channel");
const News = require("./models/News");

const syncDb = async () => {
  try {
    await database.sync();
  } catch (error) {
    console.log(error);
  }
};

const createSomeData = async () => {
  try {
    await Promise.all([
      SystemRole.create({
        name: "admin",
      }),
      SystemRole.create({
        name: "creator",
      }),
      SystemRole.create({
        name: "consumer",
      }),
      User.create({
        name: "Administrador",
        email: "admin@admin.com",
        password: auth.createPasswordHash("admin"),
        role_id: 1,
      }),
      User.create({
        name: "Criador de conteúdo",
        email: "creator@creator.com",
        password: auth.createPasswordHash("creator"),
        role_id: 2,
      }),
      User.create({
        name: "Usuário",
        email: "user@user.com",
        password: auth.createPasswordHash("user"),
        role_id: 3,
      }),
    ]);
  } catch (error) {
    console.log(error);
  }
};

const init = async () => {
  await syncDb();
  await createSomeData();
};

init();
