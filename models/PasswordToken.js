const knex = require("../database/connection")
const User = require("./User")
const uuid = require('uuid')

class PasswordToken {
    async create(email) {
        const user = await User.findByEmail(email)

        if (user === undefined) {
            return false
        }

        try {
            await knex.insert({
                user_id: user.id,
                used: 0,
                token: uuid.v4()
            }).table("passwordTokens")
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }
}

module.exports = new PasswordToken()