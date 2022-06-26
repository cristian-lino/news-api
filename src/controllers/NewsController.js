const News = require('../models/News');
const Channel = require('../models/Channel');
const User = require('../models/User');

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
        const { message, hasImage, image_path, user_id, channel_id } = req.body

        const user = await User.findByPk(user_id)
        if (!user) {
            return res.status(422).json({ message: `user ${user_id} does not exists` })
        }

        const channel = await Channel.findByPk(channel_id)
        if (!channel) {
            return res.status(422).json({ message: `channel ${channel_id} does not exists` })
        }

        const newNews = await News.create({
            message: message,
            hasImage: hasImage,
            image_path: image_path,
            user_id: user_id,
            channel_id: channel_id
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