require('dotenv').config()

const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');

const passportConfig = require('./config/passport');
const authRoutes = require('./routes/auth');

mongoose.connect(process.env.MONGODB_URI);

const app = express();
app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000, // 1 day
	keys: [process.env.COOKIE_KEY]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);

app.listen(process.env.PORT, () => {
	console.log(`Server running at: http://localhost:${process.env.PORT}`);
});