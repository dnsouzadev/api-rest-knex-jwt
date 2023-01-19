const User = require("../models/User")

class UserController {
    async index(req, res) {
        res.status(405)
        res.json({ success: false, message: "Method Not Accepted" })
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
        
            return res.status(200).json({ success: true, message: "User Created With Success" })

        } catch {
            return res.status(400).json({ success: false, message: "Invalid Credentials" })
        }
    }
}

module.exports = new UserController()