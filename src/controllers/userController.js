const User = require('../models/User');
const SystemRole = require('../models/SystemRole');
const auth =  require('../services/auth')

const index = async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json()
        }

        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const create = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const user = await User.findOne({ where: { email: email } })

        if (user) {
            return res.status(422).json({ message: `User ${email} already exists` })
        }

        const encryptedPassword = auth.createPasswordHash(password)
        const newUser = await User.create({
            name: name,
            email: email,
            password: encryptedPassword,
            role_id: 3
        })
        return res.status(201).json(newUser)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const { name, email, password, role_id } = req.body

        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json()
        }

        if (role_id) {
            const role = await SystemRole.findByPk(role_id)

            if (!role) {
                return res.status(422).json({ message: `Role ${role_id} does not exists` })
            }
        }

        const encryptedPassword = auth.createPasswordHash(password)
        user.set({
            name: name,
            email: email,
            password: encryptedPassword,
            role_id: role_id
        })

        await user.save()
        
        return res.status(200).json()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json()
        }

        await user.destroy()
        
        return res.status(200).json()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {index, show, create, update, destroy}