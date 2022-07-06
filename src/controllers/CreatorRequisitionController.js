const User = require("../models/User");
const CreatorRequisition = require("../models/CreatorRequisition");
const Utils = require("../utils/urlToQuery");

const index = async (req, res) => {
  try {
    const data = await CreatorRequisition.findAll();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const create = async (req, res) => {
  try {
    const query = Utils.urlToQuery(req.url);

    const userId = query.userId;
    if (!userId) {
      return res.status(500).json({ message: `invalid data` });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res
        .status(422)
        .json({ message: `user ${userId} does not exists` });
    }

    const requisition = await CreatorRequisition.findOne({
      where: { user_id: userId },
    });
    if (requisition) {
      return res
        .status(422)
        .json({ message: `user ${userId} already has a reservation` });
    }

    const data = await CreatorRequisition.create({
      name: user.name,
      user_id: userId,
      status: "PENDING",
    });
    return res.status(201).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const query = Utils.urlToQuery(req.url);
    const status = query.status;

    const requisition = await CreatorRequisition.findByPk(id);
    if (!requisition) {
      return res
        .status(422)
        .json({ message: `requisition ${id} does not exists` });
    }

    const user = await User.findByPk(requisition.user_id);

    if (status === "APPROVED") {
      user.set({
        role_id: 2,
      });

      await user.save();
    }

    requisition.set({
      status: status,
    });
    await requisition.save();

    return res.status(200).json();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { index, create, update };
