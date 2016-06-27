'use strict';
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compress = require('compression');

// Load local environment variables in development
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').load();
}
let production = process.env.NODE_ENV === 'production';

// Login
const session = require('express-session');
const passport = require('passport');
require('./passport')(passport);

// Database
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

/** True = get response details on served node modules **/
let verboseLogging = false;

/** Gzip files in production **/
if (production) {
  app.use(compress());
}

app.use(bodyParser.json());

app.use(morgan('dev', {
  skip: (req, res) => {
    if (verboseLogging) return false;
    else return req.baseUrl === '/scripts';
  }
}));

app.use( express.static( path.join(__dirname, '../dist') ));

app.use('/scripts', express.static( path.join(__dirname, '../node_modules') ));
app.use('/app', express.static( path.join(__dirname, '../dist/app') ));

app.use(session({
	secret: 'secretRandSessionPass',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/sign-up', passport.authenticate('local-signup', {
  successRedirect: '',
  failureRedirect: '/signup'
}));

app.post('/log-in', passport.authenticate('local-login', {
  successRedirect: '',
  failureRedirect: '/login'
}));

app.get('/auth/checkCreds', (req, res) => {
	if (req.isAuthenticated()) {
		let userInfo = {
			username: req.user.username
		}
		res.send({loggedIn: true, user: userInfo});
	} else res.send({loggedIn: false, user: null});
});

app.get('/auth/logout', (req, res) => {
	req.logout();
	res.end();
});

/** Pass all non-api routes to front-end router for handling **/ 
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

let port = process.env.PORT || 3000;
let server = app.listen(port, () => console.log(`Listening on port ${port}...`));