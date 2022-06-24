const GeneralPermission = require('../models/GeneralPermission');
const SystemRole = require('../models/SystemRole');

const index = async (req, res) => {
    try {
        const permissions = await GeneralPermission.findAll()
        res.status(200).json(permissions)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const show = async (req, res) => {
    try {
        const { id } = req.params
        const permission = await GeneralPermission.findByPk(id)

        if (!permission) {
            return res.status(404).json()
        }

        return res.json(permission)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const create = async (req, res) => {
    try {
        const { 
            screen,
            allow_read,
            allow_create,
            allow_edit,
            allow_delete,
            role_id
        } = req.body

        const permission = await GeneralPermission.findOne({ where: { screen: screen, role_id: role_id } })

        if (permission) {
            return res.status(422).json({ message: `screen ${screen} already have a role for ${role_id}` })
        }

        const role = await SystemRole.findByPk(role_id)
        if (!role) {
            return res.status(422).json({ message: `Role ${role_id} does not exists` })
        }

        const newPermission = await GeneralPermission.create({
            screen: screen,
            allow_read: allow_read,
            allow_create: allow_create,
            allow_edit: allow_edit,
            allow_delete: allow_delete,
            role_id: role_id
        })
        return res.status(201).json(newPermission)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const { 
            screen,
            allow_read,
            allow_create,
            allow_edit,
            allow_delete,
            role_id
        } = req.body

        const permission = await GeneralPermission.findByPk(id)

        if (!permission) {
            return res.status(404).json()
        }

        const role = await SystemRole.findByPk(role_id)
        if (!role) {
            return res.status(422).json({ message: `Role ${role_id} does not exists` })
        }

        const p = await GeneralPermission.findOne({ where: { screen: screen, role_id: role_id } })

        if (p.id != id) {
            return res.status(422).json({ message: `screen ${screen} already have a role for ${role_id}` })
        }

        permission.set({
            screen: screen,
            allow_read: allow_read,
            allow_create: allow_create,
            allow_edit: allow_edit,
            allow_delete: allow_delete,
            role_id: role_id
        })

        await permission.save()
        
        return res.status(200).json()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params

        const permission = await GeneralPermission.findByPk(id)

        if (!permission) {
            return res.status(404).json()
        }

        await permission.destroy()
        
        return res.status(200).json()
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {index, show, create, update, destroy}