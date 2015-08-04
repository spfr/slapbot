// grab the packages we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({	extended: true })); 

// routes 

// POST http://localhost:8080/slapbot/
// parameters sent with 
app.post('/slapbot', function(req, res) {
	var username = req.body.user_name;
	var shouldslap = req.body.username;
	if (shouldslap == undefined) {
		res.status(400).send('Need a user to slap! DUUUH!');
	} else {
	
		res.send(username + " slaps " + shouldslap + " around a bit with a large trout! :fish: ");
	}
});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);