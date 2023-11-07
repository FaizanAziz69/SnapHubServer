const cloudinary = require('../utils/cloudinary');
const Image = require('../models/imageModel');
const User = require('../models/userModel')
const { Readable } = require('stream');
const Like = require('../models/likeModel')
const Comment = require('../models/commentModel')
const uploadImageToCloudinary = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file;
    const user = req.user.userId;
    console.log(user)
    console.log(user.id)
    if (!image) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageStream = new Readable();
    imageStream.push(image.buffer);
    imageStream.push(null);

    const cloudinaryResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });

      imageStream.pipe(uploadStream);
    });

   
    const newImage = new Image({
      title,
      description,
      imageUrl: cloudinaryResponse.secure_url,
      userId: user, 
    });

    await newImage.save();

    res.status(201).json({ message: 'Image uploaded successfully', newImage });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getImages = async (req, res) => {
  try {
    const allImages = await Image.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'email'],
        },
        {
          model: Like,
          attributes: ['id', 'like'],
          include: {
            model: User,
            attributes: ['id', 'firstName', 'email'],
          },
        },
        {
          model: Comment,
          attributes: ['id', 'comment'],
          include: {
            model: User,
            attributes: ['id', 'firstName', 'email'],
          },
        },
      ],
    });

    res.status(200).json(allImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  uploadImageToCloudinary,
  getImages
};

