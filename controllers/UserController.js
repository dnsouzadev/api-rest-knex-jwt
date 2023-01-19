const User = require("../models/User")

class UserController {
    async index(req, res) {
        const result = await User.findAll()

        return res.json(result)
    }

    async findUserById(req, res) {
        const { id } = req.params
        const result = await User.findById(id)

        if (result === undefined) {
            return res.status(204).json({ success: false, message: "No User Found" })
        }

        return res.status(200).json(result)
    }

    async findUserByEmail(req, res) {
        const { email } = req.params
        const result = await User.findByEmail(email)

        if (result === undefined) {
            return res.status(204).json({ success: false, message: "No User Found" })
        }

        return res.status(200).json(result)
    }

    async create(req, res) {

        try {
            let { name, email, password } = req.body

            if (!email || !name || !password) {
                return res.status(400).json({ success: false, message: "Invalid Credentials" })
            }

            if (await User.findEmail(email)) {
                return res.status(409).json({ success: false, message: "Email Already Exists" })
            }

            await User.new(name, email, password)
        
            return res.status(201).json({ success: true, message: "User Created With Success" })

        } catch {
            return res.status(400).json({ success: false, message: "Invalid Credentials" })
        }
    }
}

module.exports = new UserController()