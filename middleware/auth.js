const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No Authorization header provided.' });
  }

  const tokenParts = authHeader.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(400).json({ message: 'Invalid token format. Use "Bearer <token>".' });
  }

  const token = tokenParts[1];

  try {
    const decoded = jwt.verify(token, 'your-secret-key');

    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
}

module.exports = authenticate;
