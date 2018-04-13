require('dotenv').config()

const express = require('express');

const app = express();

app.listen(process.env.PORT, () => {
	console.log(`Server running at: http://localhost:${process.env.PORT}`);
});