var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'gbb5z1HkOZyLbS41OW5fWFEdW',
  consumer_secret: 'DQVS6LMHuqhy1CvNE2tul6b5IAh9tCjrF7p4q6Ni2nXxYitRh4',
  access_token_key: '133166067-yLtPRxQCeqts3Msk6MuJXGFM9GkAJlgv7PgHip6o',
  access_token_secret: 'RGGTCI5UMBxhRkCHLexCPGYSK9mfHOn2Wh2TkTQQSYSdT'
});
 
var params = {screen_name: 'nodejs'};/*
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});*/




var express = require('express'),

app = express(),
port = process.env.PORT || 3000;
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
var result ="";
/*
client.get('search/tweets', {q: '#2hack1we'}, function(error, tweets, response) {
   console.log(tweets);

   result = tweets;
   
});
   */

   res.render('pages/index', {data:result, content:"content.ejs"});
});


app.get('/slackoauth', function(req, res) {
var result ="";
  console.log(req.query.code);

  //https://slack.com/api/oauth.access?client_id=CLIENT_ID&client_secret=CLIENT_SECRET&code=XXYYZZ

  client.get('https://slack.com/api/oauth.access?&scope=bot,incoming-webhook&client_id=83554108657.83546957248&client_secret=c3e12113aea0fc064ecba5fbddcd8801&code='+req.query.code, {q: '#2hack1we'}, function(error, tweets, response) {
   console.log(tweets);
   var token = tweets.bot.bot_access_token;
   console.log("access:" + token);
   var channel = tweets.incoming_webhook.channel_id;

   var requestify = require('requestify');

requestify.post('https://slack.com/api/chat.postMessage', {
    token: token,
    channel:channel,
    username: "mybot",
    text:"yeah"
})
.then(function(response) {
    // Get the response body (JSON parsed or jQuery object for XMLs)
   result = response.getBody();
   console.log( result);
   result="";
    res.render('pages/index', {data:result, content:"content.ejs"});
});
 
   
});


 //  res.render('pages/index', {data:result, content:"content.ejs"});
});

app.get('/slack', function(req, res) {
var result ="";
/*
client.get('search/tweets', {q: '#2hack1we'}, function(error, tweets, response) {
   console.log(tweets);

   result = tweets;
   
});
   */

   res.render('pages/index', {data:result, content:"slacklogin.ejs"});
});


app.get('/search', function(req, res) {
var result ="";

 res.setHeader('Content-Type', 'application/json');
 client.get('search/tweets', {q: req.query.search}, function(error, tweets, response) {
   console.log(tweets);

   result = tweets;
    res.send(JSON.stringify(result)); 
});

     
});

app.get('/msg', function(req, res) {
  var Curl = require( 'node-libcurl' ).Curl;
 
var curl = new Curl(),
    close = curl.close.bind( curl );
 
curl.setOpt( curl.option.any, 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX' );
curl.setOpt( curl.option.HTTPPOST, [
    {  type: 'Content-type: application/json' },
   {
    "text": "Would you like to play a game?",
    "attachments": [
        {
            "text": "Choose a game to play",
            "fallback": "You are unable to choose a game",
            "callback_id": "wopr_game",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "chess",
                    "text": "Chess",
                    "type": "button",
                    "value": "chess"
                },
                {
                    "name": "maze",
                    "text": "Falken's Maze",
                    "type": "button",
                    "value": "maze"
                },
                {
                    "name": "war",
                    "text": "Thermonuclear War",
                    "style": "danger",
                    "type": "button",
                    "value": "war",
                    "confirm": {
                        "title": "Are you sure?",
                        "text": "Wouldn't you prefer a good game of chess?",
                        "ok_text": "Yes",
                        "dismiss_text": "No"
                    }
                }
            ]
        }
    ]
}
]);
 
curl.on( 'end', close );
curl.on( 'error', close );

   res.send(JSON.stringify({ a: 1 })); 
});
app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});