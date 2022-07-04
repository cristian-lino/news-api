const News = require('../models/News');
const Channel = require('../models/Channel');
const User = require('../models/User');
const Utils = require('../utils/urlToQuery')

const index = async (req, res) => {
    try {
        const news = await News.findAll()
        res.status(200).json(news)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const news = await News.findByPk(id)

        if (!news) {
            return res.status(404).json()
        }

        return res.json(news)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const create = async (req, res) => {
    try {
        const { message, image_path } = req.body
        const query = Utils.urlToQuery(req.url)
        const userId = query.userId
        const channelId = query.channelId

        if (!userId || !channelId) {
            return res.status(500).json({ message: `invalid query values` })
        }

        const user = await User.findByPk(userId)
        if (!user) {
            return res.status(422).json({ message: `user ${userId} does not exists` })
        }

        const channel = await Channel.findByPk(channelId)
        if (!channel) {
            return res.status(422).json({ message: `channel ${channelId} does not exists` })
        }

        const newNews = await News.create({
            message: message,
            hasImage: image_path ? true : false,
            image_path: image_path,
            user_id: userId,
            channel_id: channelId
        })
        return res.status(201).json(newNews)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const { message, hasImage, image_path, user_id } = req.body

        const news = await News.findByPk(id)

        if (!news) {
            return res.status(404).json()
        }

        news.set({
            message: message,
            hasImage: hasImage,
            image_path: image_path,
            user_id: user_id
        })

        await news.save()
        
        return res.status(200).json()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params

        const news = await News.findByPk(id)

        if (!news) {
            return res.status(404).json()
        }

        await news.destroy()
        
        return res.status(200).json()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {index, show, create, update, destroy}