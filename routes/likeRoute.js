const express = require("express")
const auth = require('../middleware/auth')
const likeController = require('../controllers/likeController')

const router = express.Router()

router.post('/add',auth,likeController.addLike)
router.get('/all',auth,likeController.getAllLikes)


module.exports = router