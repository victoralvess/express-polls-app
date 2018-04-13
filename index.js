require('dotenv').config()

const express = require('express');


const passportConfig = require('./config/passport');
const authRoutes = require('./routes/auth');

const app = express();

app.use('/auth', authRoutes);

app.listen(process.env.PORT, () => {
	console.log(`Server running at: http://localhost:${process.env.PORT}`);
});