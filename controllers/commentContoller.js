const Comment = require('../models/commentModel')
const User = require('../models/userModel')
const Image = require('../models/imageModel')

const createComment = async(req,res)=>{
    try {
        const {comment,imageId} = req.body
        const user = req.user
        console.log(user)
       const image = await Image.findByPk(imageId)
       if (!image) {
          return res.status(404).json({message:"image not found"})
        }   

        
    if(!user){
        return res.status(400).json({meesage:"user is not logged In"})
    }

    const newComment = await Comment.create({
        comment,
        imageId,
        userId:user.userId
    })
     res.status(200).json({message:"Comment posted successfully",newComment})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getAllComment = async (req, res) => {
    try {
      const allComments = await Comment.findAll({
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
  
      res.status(200).json(allComments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
 
  
module.exports = {createComment,getAllComment }