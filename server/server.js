'use strict';
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compress = require('compression');
const _ = require('lodash');
const books = require('google-books-search');

/** Format DB document before sending to client */
function formatDBRes(dbDoc) {
	let formattedDocObj = _.omit(dbDoc.toObject(), ['password', '_id', '__v']);
	return formattedDocObj;
}

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
const Book = require('./book');
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

app.post('/auth/signup', (req, res, next) => {
	passport.authenticate('local-signup', (err, user, info) => {
		if (err) return res.status(500).json({message: 'auth error', stringyErr: err.toString(), fullErr: err});
		if (!user) return res.status(400).json(info);
		req.logIn(user, (err) => {
			if (err) return res.status(500).json({message: 'signup error', stringyErr: err.toString(), fullErr: err});
			return res.status(200).json({message: 'signup success!', user: user.username});
		});
	})(req, res, next);
});

app.post('/auth/login', (req, res, next) => {
	passport.authenticate('local-login', (err, user, info) => {
		if (err) return res.status(500).json({message: 'auth error', stringyErr: err.toString(), fullErr: err});
		if (!user) return res.status(400).json(info);
		req.logIn(user, (err) => {
			if (err) return res.status(500).json({message: 'login error', stringyErr: err.toString(), fullErr: err});
			else {
				let userFormatted = formatDBRes(user);
				return res.status(200).json({message: 'login success!', userFormatted});
			}
		});
	})(req, res, next);
});

app.get('/auth/checkCreds', (req, res) => {
	if (req.isAuthenticated()) {
		let userFormatted = formatDBRes(req.user);
		res.send({loggedIn: true, user: req.user});
	} else res.send({loggedIn: false, user: null});
});

app.get('/auth/logout', (req, res) => {
	req.logout();
	res.end();
});

app.get('/api/getbook/:book', (req, res) => {
	let searchopts = {limit: 1};
	books.search(req.params.book, searchopts, (err, results) => {
		if (err) return res.status(500).json({message: 'login error', stringyErr: err.toString(), fullErr: err});
		else res.status(200).send(results);
	});
});

app.post('/api/book', (req, res) => {
	let book = req.body;
	let newBook = new Book({
		id: book.id,
		title: book.title,
		link: book.link,
		thumbnailUrl: book.thumbnailUrl,
		owner: book.owner
	});
	newBook.save(err => {
		if (err) res.status(500).json({message: 'book save error', stringyErr: err.toString(), fullErr: err});
		else res.status(200).json({message: 'book saved'});
	});
});

app.get('/api/allbooks', (req, res) => {
	Book
		.find({})
		.exec()
		.then(books => {
			let formatBooks = [];
			books.forEach(book => {
				formatBooks.push(formatDBRes(book));
			});
			res.status(200).send(formatBooks);
		});
});

app.post('/api/trade/request', (req, res) => {
	let curBook = req.body;
	console.log('request', curBook);
	Book
		.findOne({ title: curBook.title })
		.exec()
		.then(serverBook => {
			serverBook.tradeRequester = curBook.tradeRequester;
			serverBook.save(err => {
				if (err) res.status(500).json({message: 'book save error', stringyErr: err.toString(), fullErr: err});
				else {
					console.log('updated serverbook:', serverBook);
					res.status(200).json({message: 'trade requested'});
				}
			});
		});
});

app.post('/api/trade/accept', (req, res) => {
	// accepted: bool; book: Book
	let tradeState = req.body;
	console.log('accept', tradeState);
	Book
		.findOne({ title: tradeState.book.title })
		.exec()
		.then(serverBook => {
			if (tradeState.accepted) {
				serverBook.owner = tradeState.book.tradeRequester;
			}
			serverBook.tradeRequester = null;
			serverBook.save(err => {
				if (err) res.status(500).json({message: 'book save error', stringyErr: err.toString(), fullErr: err});
				else {
					res.status(200).json({message: 'trade complete'});
				}
			});
		});
});

app.post('/api/trade/cancel', (req, res) => {
	let cancelledTradeBook = req.body;
	console.log('cancel', cancelledTradeBook);
	Book
		.findOne({ title: cancelledTradeBook.title })
		.exec()
		.then(serverBook => {
			serverBook.tradeRequester = null;
			serverBook.save(err => {
				if (err) res.status(500).json({message: 'book save error', stringyErr: err.toString(), fullErr: err});
				else {
					res.status(200).json({message: 'request cancelled'});
				}
			});
		});
});

/** Pass all non-api routes to front-end router for handling **/ 
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

let port = process.env.PORT || 3000;
let server = app.listen(port, () => console.log(`Listening on port ${port}...`));