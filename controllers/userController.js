const user = require("../models/userModel")
const { generateToken } = require('../utils/token');

const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, age } = req.body;
    const existingUser = await user.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
    });

    const userDetails ={
      firstName,
      lastName,
      email,
      age
    }

    res.status(200).json({ message: 'User registered successfully', userDetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const userLogin= async(req,res)=>{
    try {
        const {email,password}= req.body
        const existingUser = await user.findOne({where:{email}})
        if(!existingUser){
            res.status(404).json({message:"no user found"})
        }
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordMatch) {
          return res.status(401).json({ message: 'Incorrect password' });
        }
        const token = generateToken({ userId: existingUser.id, email: existingUser.email });

    res.status(200).json({
      message: 'User login successful',
      user: {
        id: existingUser.id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
         token: token,
      },
     
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllUsers = async(req,res)=>{
    try {
        const allUsers = await user.findAll()
        res.status(200).json({message:"All Users",allUsers})
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


const getUserbyId = async(req,res)=>{
  try {
    const userId = req.body.userId
    const userbyId = await user.findOne({where:{id:userId}})
    res.status(200).json(userbyId)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

module.exports={registerUser,userLogin,getAllUsers,getUserbyId}