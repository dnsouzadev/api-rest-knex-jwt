const knex = require("../database/connection")
const User = require("./User")
const uuid = require('uuid')

class PasswordToken {
    async create(email) {
        const user = await User.findByEmail(email)

        if (user === undefined) {
            return false
        }

        const token = uuid.v4()
        try {
            await knex.insert({
                user_id: user.id,
                used: 0,
                token: token
            }).table("passwordTokens")
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async validate(token) {
        try {
            const result = await knex.select().where({ token: token }).table("passwordTokens")

            if (result.length > 0) {
                const tk = result[0]

                if (tk.used) {
                    return false
                } else {
                    return true
                }
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
        
    }
}

module.exports = new PasswordToken()