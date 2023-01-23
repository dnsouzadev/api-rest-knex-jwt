const express = require("express")
const app = express()
const router = express.Router()

const HomeController = require("../controllers/HomeController")
const UserController = require("../controllers/UserController")

const AdminAuth = require("../middleware/AdminAuth")

router.get('/', HomeController.index)

router.get('/user', AdminAuth, UserController.index)
router.get('/user/:id', AdminAuth, UserController.findUserById)
router.get('/user/q/:email', AdminAuth, UserController.findUserByEmail)
router.post('/user', UserController.create)
router.put('/user', AdminAuth, UserController.edit)
router.delete('/user/:id', AdminAuth, UserController.remove)

router.post('/recoverypassword', UserController.recoveryPassword)
router.post('/changepassword', UserController.changePassword)

router.post("/login", UserController.login)

module.exports = router;