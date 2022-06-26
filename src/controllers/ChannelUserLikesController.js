const ChannelUserLikes = require('../models/ChannelUserLikes');
const Channel = require('../models/Channel');
const User = require('../models/User');

const index = async (req, res) => {
    try {
        const data = await ChannelUserLikes.findAll()
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const data = await ChannelUserLikes.findByPk(id)

        if (!data) {
            return res.status(404).json()
        }

        return res.json(data)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const updateLike = async (req, res) => {
    try {
        const { channelId } = req.params
        const { user_id } = req.body

        const channel = await Channel.findByPk(channelId)
        if (!channel) {
            return res.status(404).json({ message: `channel ${channelId} does not exists` })
        }

        const user = await User.findByPk(user_id)
        if (!user) {
            return res.status(404).json({ message: `user ${user_id} does not exists` })
        }

        const [row, created] = await ChannelUserLikes.findOrCreate({
            where: { channel_id: channelId, user_id: user_id },
            defaults: {
                channel_id: channelId,
                user_id: user_id,
                like: true
            }
        });

        if (!created) {
            row.set({
                channel_id: channelId,
                user_id: user_id,
                like: !row.like,
            })
            await row.save()
        }
        
        return res.status(200).json()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const create = async (req, res) => {
    try {
        const { channel_id, user_id, like } = req.body

        const data = await ChannelUserLikes.findOne({ where: { channel_id: channel_id, user_id: user_id } })

        if (data) {
            return res.status(422).json({ message: `channel ${channel_id} already have a row for ${user_id}` })
        }

        const newChannelUserLikes = await ChannelUserLikes.create({
            channel_id: channel_id,
            user_id: user_id,
            like: like
        })
        return res.status(201).json(newChannelUserLikes)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const { channel_id, user_id, like } = req.body

        const data = await ChannelUserLikes.findByPk(id)

        if (!data) {
            return res.status(404).json()
        }

        data.set({
            channel_id: channel_id,
            user_id: user_id,
            like: like
        })

        await data.save()
        
        return res.status(200).json()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params

        const data = await ChannelUserLikes.findByPk(id)

        if (!data) {
            return res.status(404).json()
        }

        await data.destroy()
        
        return res.status(200).json()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {index, show, create, update, destroy, updateLike}