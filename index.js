require('dotenv').config();

const express = require('express');
const Csrf = require('csurf');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');

const passportConfig = require('./config/passport');
const authRoutes = require('./routes/auth');

const Question = require('./models/question');
const Choice = require('./models/choice');

mongoose.connect(process.env.MONGODB_URI);

const csrf = Csrf();

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

app.get('/questions/:id', csrf, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    question.choices = await question.choices();
    res.render('question', {
      user: req.user,
      question,
      csrf_token: req.csrfToken(),
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.post(
  '/questions/:id/vote',
  bodyParser.urlencoded({extended: true}),
  csrf,
  (req, res) => {
    Choice.findById(req.body.choice)
      .then(choice => {
        choice.votes = choice.votes + 1;
        choice.save()
          .then(() => {
            res.redirect('/');
          })
          .catch(error => {
            console.log(error)
            res.sendStatus(500);
          });
      })
      .catch(error => {
        res.status(400).send('Invalid Choice.');
      });
  },
);

app.listen(process.env.PORT, () => {
  console.log(`Server running at: http://localhost:${process.env.PORT}`);
});
