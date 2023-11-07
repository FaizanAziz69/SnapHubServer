const express = require("express")
const auth = require('../middleware/auth')
const userController = require('../controllers/userController')

const router = express.Router()

router.post('/registration',userController.registerUser)
router.post('/login',userController.userLogin)
router.get('/all',auth,userController.getAllUsers)
router.get('/byId',userController.getUserbyId)

module.exports = router