const express = require('express');
const sequelize = require('./Db/configDb');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');
const commentRoutes = require('./routes/commentRoutes');
const likeRoutes = require('./routes/likeRoute')


const Image = require('./models/imageModel');
const User = require('./models/userModel');
const Comment = require('./models/commentModel');
const Like = require('./models/likeModel')

User.hasMany(Image, { foreignKey: 'userId' });
Image.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });


Image.hasMany(Comment, { foreignKey: 'imageId' });
Comment.belongsTo(Image, { foreignKey: 'imageId' });

User.hasMany(Like, { foreignKey: 'userId' });
Like.belongsTo(User, { foreignKey: 'userId' });

Image.hasMany(Like, { foreignKey: 'imageId' });
Like.belongsTo(Image, { foreignKey: 'imageId' });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRoutes);
app.use('/image', imageRoutes);
app.use('/comment', commentRoutes);
app.use('/like',likeRoutes)
app.get('/', (req, res) => {
  res.send('Hello from the home page');
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the MySQL database.');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
