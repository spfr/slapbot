var bodyParser = require('body-parser');
var express = require('express');
var request = require('request');
var constants = require('./constants.js');
var helpers = require('./helpers.js');
var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true})); 

app.post('/slap', function(req, res, next) {
  var userName = req.body.user_name;
  var message = req.body.text;
  var channel = req.body.channel_id;
  var slapTarget = '';
  var slapEmoji = '';
  if (message) {
    var items = message.split(' ');
    if (items.length >= 2) {
      slapTarget = items[0];
      slapEmoji = helpers.validEmojiFormat(items[1]);
    } else if (items.length === 1) {
      slapTarget = items[0];
      slapEmoji = helpers.DEFAULT_EMOJI;
    } else {
      res.status(400).send({error: constants.INVALID_INPUT});  
      return;
    }
  } else {
    res.status(400).send({error: constants.NO_INPUT});  
    return;
  }

  var callbackHookToken = req.query.callback;
  if (callbackHookToken == undefined) {
    res.status(400).send({error: constants.NO_HOOK});	
    return;
  }

  var banter = helpers.getRandomBanter(); 
  var botPayload = {
    'text': `${userName} slaps ${slapTarget} around a bit with a ${slapEmoji}! ${banter}`,
    'username': 'slapbot',
    'channel': channel,
    'icon_emoji': ':fish:',
    'link_names': 1
  };

  send(botPayload, req.query.callback, function (error, status, body) {
    if (error) {
      return next(error);
    } else if (status !== 200) {
      return next(new Error('Incoming WebHook: ' + status + ' ' + body));
    } else {
      res.send(`Yes Sir, Let me slap ${slapTarget}`);
    }
  });
  
});

function send (payload, webhook, callback) {
  var path = process.env.INCOMING_WEBHOOK_PATH;
  if (webhook != undefined) {
    path = webhook;
  }
  console.log('Path: '+path);
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
