const knex = require("../database/connection")
const bcrypt = require("bcrypt")
const PasswordToken = require("./PasswordToken")

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

    async update(id, name, email, role) {
        const user = await this.findById(id)

        if (user === undefined || email === undefined) {
            return false
        }

        const editUser = {}

        if (email != user.email) {
            const result = await this.findEmail(email)

            if (!result) {
                editUser.email = email
            } else {
                return false
            }
        }

        if (name != undefined) {
            editUser.name = name
        }

        if (role != undefined) {
            editUser.role = role
        }

        try {
            await knex.update(editUser).where({ id: id }).table("users")
            return true
        } catch (error) {
            return false
        }
        
    }

    async delete(id) {
        const user = await this.findById(id)

        if (user === undefined) {
            return false
        }

        try {
            await knex.delete().where({id: id}).table("users")
            return true
        } catch (error) {
            return false
        }
        
    }

    async ChangePassword(newPassword, id, token) {
        const hash = await bcrypt.hash(newPassword, 10)

        try {
            await knex.update({password: hash}).where({id: id}).table("users")
            await PasswordToken.setUsed(token)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

module.exports = new User()