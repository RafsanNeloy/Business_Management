const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT & attach user to req
exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    req.user = user; // attach the user object to request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token failed', error });
  }
};

// Check if user is an admin
exports.adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin only!' });
  }
  next();
};

// Check if user is an admin OR is the "user" role
exports.userOrAdmin = (req, res, next) => {
  if (!['admin', 'user'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Insufficient role' });
  }
  next();
};
