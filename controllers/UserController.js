class UserController {
    async index(req, res) {}

    async create(req, res) {

        try {
            let { name, email, password } = req.body

            if (!email || !name || !password) {
                res.status(400)
                res.json({success: false, message: "Invalid Credentials"})
            }

            res.json({ success: true, message: "User Created With Success"})
            
        } catch {
            res.status(400)
            res.json({success: false, message: "Invalid Credentials"})
        }
    }
}

module.exports = new UserController()