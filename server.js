// grab the packages we need
var express = require('express');
var request = require('request');
var app = express();
var port = process.env.PORT || 8080;


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({	extended: true })); 

// routes 

// POST http://localhost:8080/slapbot/
// parameters sent with 
app.post('/slapbot', function(req, res) {
	var username = req.body.user_name;
	var shouldslap = req.body.text;
	if (shouldslap == undefined) {
		res.status(400).send('Need a user to slap! DUUUH!');
	} else {

		
		var botPayload = {
			"text": username + " slaps " + shouldslap + " around a bit with a large trout! :fish: ",
			"username" : "slapbot",
			"channel" : req.body.channel_id,
			"icon_emoji" : ":fish:"

		};

		send(botPayload, function (error, status, body) {
			if (error) {
				return next(error);

			} else if (status !== 200) {
		      // inform user that our Incoming WebHook failed
		      return next(new Error('Incoming WebHook: ' + status + ' ' + body));

			  } else {
			  	res.send("Yes Sir, Let me slap "+  shouldslap + " around a bit with a large trout! :fish: ");
			  }
			});

	}
});

function send (payload, callback) {
	var path = process.env.INCOMING_WEBHOOK_PATH;
	var uri = 'https://hooks.slack.com/services' + path;

	request({
		uri: uri,
		method: 'POST',
		body: JSON.stringify(payload)
	}, function (error, response, body) {
		if (error) {
			return callback(error);
		}

		callback(null, response.statusCode, body);
	});
}

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);