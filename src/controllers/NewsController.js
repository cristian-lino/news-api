const News = require("../models/News");
const Channel = require("../models/Channel");
const User = require("../models/User");
const NewsUserLike = require("../models/NewsUserLike");
const Utils = require("../utils/urlToQuery");

const create = async (req, res) => {
  try {
    const { message, image_path } = req.body;
    const query = Utils.urlToQuery(req.url);
    const userId = query.userId;
    const channelId = query.channelId;

    if (!userId || !channelId) {
      return res.status(500).json({ message: `invalid query values` });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res
        .status(422)
        .json({ message: `user ${userId} does not exists` });
    }

    const channel = await Channel.findByPk(channelId);
    if (!channel) {
      return res
        .status(422)
        .json({ message: `channel ${channelId} does not exists` });
    }

    const newNews = await News.create({
      message: message,
      hasImage: image_path ? true : false,
      image_path: image_path,
      user_id: userId,
      channel_id: channelId,
    });
    return res.status(201).json(newNews);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
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

    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json();
    }

    const [row, created] = await NewsUserLike.findOrCreate({
      where: { news_id: id, user_id: userId },
      defaults: {
        news_id: id,
        user_id: userId,
        channel_id: news.channel_id,
        like: true,
      },
    });

    if (!created) {
      row.set({
        like: !row.like,
      });
      await row.save();
    }

    return res.status(200).json();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
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

    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json();
    }

    if (user?.role_id === 1 || news.user_id.toString() === userId) {
      await News.destroy({
        where: { id, user_id: news.user_id },
      }).then(function (deletedRecord) {
        if (deletedRecord === 1) {
          res.status(200).json({ message: "Deleted successfully" });
        } else {
          res.status(404).json({ message: "record not found" });
        }
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { create, update, destroy };
