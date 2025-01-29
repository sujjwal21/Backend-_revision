require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/auth', authRoutes);

app.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Protected route accessed', user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
