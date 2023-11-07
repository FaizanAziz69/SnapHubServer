const { DataTypes } = require('sequelize');
const sequelize = require('../Db/configDb');

const Like = sequelize.define('Like', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  like: {
    type: DataTypes.INTEGER, 
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

module.exports = Like;
