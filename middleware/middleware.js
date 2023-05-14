const jwt = require('jsonwebtoken');
authMiddleware = function (req, res, next) {
  const token = req.cookies.token || req.session.token;
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  try {
    const decodedToken = jwt.verify(token, 'your-secret-key');
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error('Error verifying token:', err);
    res.status(401).json({ error: 'Unauthorized' });
  }
};
module.exports = { authMiddleware };
