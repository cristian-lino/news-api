const database = require("./database/index");
const auth = require("./services/auth");

const User = require("./models/User");
const SystemRole = require("./models/SystemRole");

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
        id: 1,
        name: "admin",
      }),
      SystemRole.create({
        id: 2,
        name: "creator",
      }),
      SystemRole.create({
        id: 3,
        name: "consumer",
      }),
      User.create({
        id: 1,
        name: "Administrador",
        email: "admin@admin.com",
        password: auth.createPasswordHash("admin"),
        role_id: 1,
      }),
      User.create({
        id: 2,
        name: "Criador de conteúdo",
        email: "creator@creator.com",
        password: auth.createPasswordHash("creator"),
        role_id: 2,
      }),
      User.create({
        id: 3,
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
