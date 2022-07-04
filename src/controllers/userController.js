const User = require('../models/User');
const auth =  require('../services/auth')

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

module.exports = { create }