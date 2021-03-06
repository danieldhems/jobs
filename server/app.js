var bodyParser = require('body-parser');
var path = require('path');
var	express = require('express');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,'../dist')));

// Configure API endpoints
app.use('/api/roles', require('./api/roles.js'));
app.use('/api/agents', require('./api/agents.js'));
app.use('/api/interviews', require('./api/interviews.js'));

// Configure base URL for home page
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '../dist/index.html'));
});

module.exports = app;
