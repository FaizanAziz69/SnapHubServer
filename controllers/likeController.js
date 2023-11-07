const Comment = require('../models/commentModel')
const User = require('../models/userModel')
const Image = require('../models/imageModel')
const Like = require('../models/likeModel')

const addLike = async (req, res) => {
    try {
      const { imageId } = req.body;
      const image = await Image.findByPk(imageId)
      if (!image) {
        return res.status(400).json({message:"image not found"})
      }
      const user = req.user;
      console.log(user);
      const existingLike = await Like.findOne({ where: { userId: user.userId, imageId } });
  
      if (existingLike) {
        return res.status(400).json({ message: 'User has already liked the image' });
      }
    
      const like = 1;
  
      const newLike = await Like.create({
        like,
        userId: user.userId,
        imageId,
      });
  
      res.status(200).json({ message: 'Like created successfully', newLike });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getAllLikes = async (req, res) => {
    try {
      const allLike = await Like.findAll({
        include: [
          {
            model: User, 
            attributes: ['id', 'firstName', 'lastName', 'email'], 
          },
          {
            model: Image, 
            attributes: ['id', 'title', 'imageUrl'], 
          },
        ],
      });
  
      res.status(200).json(allLike);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  module.exports = { addLike,getAllLikes};
  
  
