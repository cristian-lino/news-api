const SystemRole = require('../models/SystemRole');
const User = require('../models/User');

const index = async (req, res) => {
    try {
        const roles = await SystemRole.findAll()
        res.status(200).json(roles)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const role = await SystemRole.findByPk(id)

        if (!role) {
            return res.status(404).json()
        }

        return res.json(role)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const create = async (req, res) => {
    try {
        const { name } = req.body

        const role = await SystemRole.findOne({ where: { name: name } })

        if (role) {
            return res.status(422).json({ message: `Role ${name} already exists` })
        }

        const newRole = await SystemRole.create({
            name: name
        })
        return res.status(201).json(newRole)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body

        const role = await SystemRole.findByPk(id)

        if (!role) {
            return res.status(404).json()
        }

        role.set({
            name: name
        })

        await role.save()
        
        return res.status(200).json()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params

        const role = await SystemRole.findByPk(id)

        if (!role) {
            return res.status(404).json()
        }

        const users = await User.findAll({ where: { role_id: id } })

        for await (const user of users) {
            user.set({
                role_id: null
            })
            user.save()
        }
        
        await role.destroy()
        
        return res.status(200).json()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {index, show, create, update, destroy}