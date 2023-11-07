const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('socialapp', 'root', 'faziaziz1/8', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false 
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});



module.exports = sequelize;

