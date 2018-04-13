const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../models/user');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
	.then(user => {
		done(null, user);
	})
	.catch(err => {
		done(err);
	});
});

passport.use(
	new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: '/auth/google/callback'
	},
	(accessToken, refreshToken, profile, done) => {
		User.findOne(
			{ googleId: profile.id },
			(err, user) => {
				if (err) done(err);
				else if (user) done(null, user);
				else {
					new User({
						username: profile.displayName,
						googleId: profile.id,
						thumbnail: profile._json.image.url
					})
					.save()
					.then(newUser => {
						done(null, newUser);
					})
					.catch(err => {
						done(err);
					});
				}
			}
		);
	})
);