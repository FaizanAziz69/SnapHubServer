const jwt = require('jsonwebtoken');

function generateToken(payload) {
  return jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, 'your-secret-key');
  } catch (error) {
    return null; 
  }
}

module.exports = { generateToken, verifyToken };
