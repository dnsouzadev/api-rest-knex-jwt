const jwt = require('jsonwebtoken')

const secret = 'secret'

module.exports = (req, res, next) => {
    const authToken = req.headers['authorization']

    if (authToken != undefined) {
        const bearer = authToken.split(" ")
        const token = bearer[1]

        try {
            const decoded = jwt.verify(token, secret)
            if (decoded.role == 1) {
                next()
            } else {
                res.status(401)
                res.send("you do not have permission for access this page")
                return 
            }
             
        } catch (error) {
            res.status(401)
            res.send("you are not authorized")
            return
        }
        

    } else {
        res.status(401)
        res.send("you are not authorized")
        return
    }
}