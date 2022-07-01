const auth = require("../services/auth");
const authConfig = require("../config/auth");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const SystemRole = require("../models/SystemRole");

const create = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json({ error: "User invalid." });
    }

    if (!auth.checkPassword(user, password)) {
      return res.status(401).json({ error: "Password invalid." });
    }

    const { id, name } = user;
    const role = await SystemRole.findByPk(user.role_id);

    const returnedRole = {
      id: role.id,
      name: role.name,
    };

    return res.json({
      token: jwt.sign(
        { id, email, name, role: returnedRole },
        authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        }
      ),
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { create };
