const jwt = require('jsonwebtoken');
const Blacklist = require('../models/Blacklist');

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const isBlacklisted = await Blacklist.findOne({ token });
    if (isBlacklisted) return res.status(403).json({ message: 'Token is blacklisted' });

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
