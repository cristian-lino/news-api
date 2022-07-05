const Channel = require("../models/Channel");
const User = require("../models/User");
const News = require("../models/News");
const NewsUserLike = require("../models/NewsUserLike");
const Utils = require("../utils/urlToQuery");

const index = async (req, res) => {
  try {
    const channels = await Channel.findAll();
    var data = [];

    for await (const channel of channels) {
      const countNews = await News.findAll({
        where: { channel_id: channel.id },
      });
      const countLikes = await NewsUserLike.findAll({
        where: { channel_id: channel.id, like: true },
      });

      var aux = {
        id: channel.id,
        title: channel.title,
        description: channel.description,
        messagesAmount: countNews.length,
        likesAmount: countLikes.length,
      };
      data.push(aux);
    }

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const show = async (req, res) => {
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

    const channel = await Channel.findByPk(id);
    if (!channel) {
      return res.status(404).json();
    }

    var data = [];
    const countNews = await News.findAll({ where: { channel_id: channel.id } });

    for await (const news of countNews) {
      const countLikes = await NewsUserLike.findAll({
        where: { news_id: news.id, like: true },
      });

      const [row, created] = await NewsUserLike.findOrCreate({
        where: { news_id: news.id, user_id: userId },
        defaults: {
          news_id: news.id,
          user_id: userId,
          channel_id: news.channel_id,
          like: false,
        },
      });

      var aux = {
        id: news.id,
        message: news.message,
        hasImage: news.hasImage,
        image_path: news.image_path,
        likesAmount: countLikes.length,
        isLiked: row.like,
      };
      data.push(aux);
    }

    return res.json({
      title: channel.title,
      description: channel.description,
      messages: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const create = async (req, res) => {
  try {
    const { title, description } = req.body;

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

    const newChannel = await Channel.create({
      title: title,
      description: description,
      user_id: userId,
    });

    return res.status(201).json(newChannel);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { index, show, create };
