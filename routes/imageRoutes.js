const express = require('express');
const imageController = require('../controllers/imageController');
const multer = require('multer'); // Import multer
const authenticate = require('../middleware/auth');

const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'),authenticate, imageController.uploadImageToCloudinary);
router.get('/posts',imageController.getImages)
module.exports = router;