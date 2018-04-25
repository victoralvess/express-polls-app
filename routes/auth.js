const router = require('express').Router();
const passport = require('passport');

router.get('/logout', (req, res) => {
	req.logout();
  res.redirect('/');
});

router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile']
	})
);

router.get(
	'/google/callback',
	passport.authenticate('google'),
	(req, res) => {
    res.redirect('/');
	}
);

router.get('/login', (req, res) => {
  res.render('sign-in', { user: req.user });
});

module.exports = router;
