const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Blacklist = require('../models/Blacklist');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: 'User already exists' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
    res.json({ accessToken });
};

exports.logout = async (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(400).json({ message: 'No token provided' });

    await new Blacklist({ token }).save();
    res.json({ message: 'Logged out successfully' });
};

exports.refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: 'No refresh token provided' });

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        const newAccessToken = generateAccessToken({ _id: decoded.userId });
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
};
