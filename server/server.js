'use strict';
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compress = require('compression');
require('dotenv').load();

let production = process.env.NODE_ENV === 'production';

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

app.use( express.static( path.join(__dirname, '../public') ));

app.use('/scripts', express.static( path.join(__dirname, '../node_modules') ));
app.use('/js', express.static( path.join(__dirname, '../public/js') ));

app.get('/test', (req, res) => {
	res.status(200).end('We workey!');
});

/** Pass all non-api routes to front-end router for handling **/ 
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

let port = process.env.PORT || 3000;
let server = app.listen(port, () => console.log(`Listening on port ${port}...`));