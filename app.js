const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
	res.send('hello world');
});

app.listen(3000, () => {
	console.log(`listening on port: 3000`);
});
