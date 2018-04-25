require('dotenv').config();

const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');

const passportConfig = require('./config/passport');
const authRoutes = require('./routes/auth');

const Question = require('./models/question');
const Choice = require('./models/choice');

mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/popper.js/dist/umd'));
app.use(express.static('node_modules/jquery/dist'));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    keys: [process.env.COOKIE_KEY],
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);

app.get('/', async (req, res) => {
  res.render('index', {user: req.user, questions: await Question.find()});
});

app.get('/questions/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    question.choices = await question.getChoices();
    res.render('question', {
      user: req.user,
      question,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at: http://localhost:${process.env.PORT}`);
});
