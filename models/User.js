const knex = require("../database/connection")
const bcrypt = require("bcrypt")

class User {

    async findAll() {
        try {
            const result = await knex.select(["id", "name", "email", "role"]).table("users")

            return result
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async findById(id) {
        try {
            const result = await knex.select(["id", "name", "email", "role"]).where({id: id}).table("users")

            if (result.length > 0) {
                return result[0]
            }

            return undefined
        } catch (error) {
            console.log(error)
            return undefined
        }
    }

    async findByEmail(email) {
        try {
            const result = await knex.select(["id", "name", "email", "role"]).where({email: email}).table("users")

            if (result.length > 0) {

                return result[0]
            }
            return undefined
        } catch (error) {
            console.log(error)
            return undefined
        }
    }

    async new(name, email, password) {
        try {
            const hash_password = await bcrypt.hash(password, 10)

            return await knex.insert({ name, email, password: hash_password, role: 0 }).table("users")
        } catch (error) {
            return console.log(error)
        }
        
    }

    async findEmail(email) {
        try {
            const result = await knex.select("*").from("users").where({ email: email})

            if (result.length > 0) {
                return true
            }

            return false
        } catch (error) {
            console.log(error)
            return false
        }
        
    }
}

module.exports = new User()