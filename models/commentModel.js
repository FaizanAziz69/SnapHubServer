const { DataTypes } = require('sequelize');
const sequelize = require('../Db/configDb'); 

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  
  imageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});


module.exports = Comment;
