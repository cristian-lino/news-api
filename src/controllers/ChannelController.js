const Channel = require('../models/Channel');
const User = require('../models/User');
const News = require('../models/News');
const ChannelUserLikes = require('../models/ChannelUserLikes');

const index = async (req, res) => {
    try {
        var url = require('url');
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;

        const userId = query.userId

        if (!userId) {
            return res.status(500).json({ message: `invalid data` })
        }
        const user = await User.findByPk(userId)

        if (!user) {
            return res.status(422).json({ message: `user ${userId} does not exists` })
        }

        const channels = await Channel.findAll()
        var data = []

        for await (const channel of channels) {
            const count = await News.findAll({ where: { channel_id: channel.id } })
            const countLikes = await ChannelUserLikes.findAll({ where: { channel_id: channel.id, like: true } })
            const [row, created] = await ChannelUserLikes.findOrCreate({
                where: { channel_id: channel.id, user_id: userId },
                defaults: {
                    channel_id: channel.id,
                    user_id: userId,
                    like: false
                }
            });

            var aux = {
                channel: channel,
                messagesAmount: count.length,
                likesAmount: countLikes.length,
                like: row.like
            }
            data.push(aux)
        }

        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const channel = await Channel.findByPk(id)

        if (!channel) {
            return res.status(404).json()
        }

        const count = await News.findAll({ where: { channel_id: id } })

        return res.json({channel: channel, messages: count})
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const create = async (req, res) => {
    try {
        const { title, description, user_id } = req.body

        const user = await User.findByPk(user_id)

        if (!user) {
            return res.status(422).json({ message: `user ${user_id} does not exists` })
        }

        const newChannel = await Channel.create({
            title: title,
            description: description,
            user_id: user_id
        })

        return res.status(201).json(newChannel)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description } = req.body

        const channel = await Channel.findByPk(id)

        if (!channel) {
            return res.status(404).json()
        }

        channel.set({
            title: title,
            description: description
        })

        await channel.save()
        
        return res.status(200).json()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params

        const channel = await Channel.findByPk(id)

        if (!channel) {
            return res.status(404).json()
        }

        await channel.destroy()
        
        return res.status(200).json()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {index, show, create, update, destroy}