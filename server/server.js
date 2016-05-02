'use strict';
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(morgan('dev'));

let pathname = path.join(__dirname, "../public");
app.use( express.static(pathname) );

app.use('/scripts', express.static( path.join(__dirname, '../node_modules') ));
app.use('/js', express.static( path.join(__dirname, '../public/js') ));

app.get('/test', (req, res) => {
	res.status(200).end('We workey!');
});

let port = process.env.PORT || 3000;
let server = app.listen(port, () => console.log(`Listening on port ${port}...`));