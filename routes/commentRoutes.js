const express = require("express")
const auth = require('../middleware/auth')
const commentController = require('../controllers/commentContoller')

const router = express.Router()

router.post('/post',auth,commentController.createComment)
router.get('/all',auth,commentController.getAllComment)

module.exports = router