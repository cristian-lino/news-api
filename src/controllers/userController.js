const User = require("../models/User");
const auth = require("../services/auth");
const SystemRole = require("../models/SystemRole");

const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (user) {
      return res.status(422).json({ message: `User ${email} already exists` });
    }

    const encryptedPassword = auth.createPasswordHash(password);
    const newUser = await User.create({
      name: name,
      email: email,
      password: encryptedPassword,
      role_id: 3,
    });
    return res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json();
    }

    const role = await SystemRole.findByPk(user.role_id);
    if (!role) {
      return res.status(404).json();
    }

    const returnedRole = {
      id: role.id,
      name: role.name,
    };

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: returnedRole,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { create, show };
