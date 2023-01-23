const express = require("express")
const app = express()
const router = express.Router()

const HomeController = require("../controllers/HomeController")
const UserController = require("../controllers/UserController")

router.get('/', HomeController.index)

router.get('/user', UserController.index)
router.get('/user/:id', UserController.findUserById)
router.get('/user/q/:email', UserController.findUserByEmail)
router.post('/user', UserController.create)
router.put('/user', UserController.edit)
router.delete('/user/:id', UserController.remove)

router.post('/recoverypassword', UserController.recoveryPassword)
router.post('/changepassword', UserController.changePassword)

router.post("/login", UserController.login)
module.exports = router;