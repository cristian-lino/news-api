const auth =  require('../services/auth')

const User = require('../models/User');
const GeneralPermission = require('../models/GeneralPermission');
const SystemRole = require('../models/SystemRole');

const create = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ where: { email: email } })

        if (!user) {
            return res.status(401).json({error: "User invalid."})
        }

        if (!auth.checkPassword(user, password)) {
            return res.status(401).json({error: "Password invalid."})
        }

        const { id, name } = user
        const role = await SystemRole.findByPk(user.role_id)
        const p = await GeneralPermission.findAll()
        const permissions = p.filter(a => a.role_id === user.role_id)

        return res.json({id, email, name, role, permissions})
    } catch (error) {
        throw error
    }
}

module.exports = { create }