var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'gbb5z1HkOZyLbS41OW5fWFEdW',
    consumer_secret: 'DQVS6LMHuqhy1CvNE2tul6b5IAh9tCjrF7p4q6Ni2nXxYitRh4',
    access_token_key: '133166067-yLtPRxQCeqts3Msk6MuJXGFM9GkAJlgv7PgHip6o',
    access_token_secret: 'RGGTCI5UMBxhRkCHLexCPGYSK9mfHOn2Wh2TkTQQSYSdT'
});

var params = { screen_name: 'nodejs' };/*
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});*/


 var Slack = require('slack-node');

var express = require('express'),
    bodyParser = require('body-parser');

var api_token = "xoxb-83587453430-44ZjcrhbEvKynb4KthpNmQOI";

app = express(),
    port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    var result = "";
    res.render('pages/index', { data: result, content: "content.ejs" });
});


app.get('/slackoauth', function (req, res) {
    var result = "";
    console.log(req.query.code);

 //   client.get('https://slack.com/api/oauth.access?&scope=bot,incoming-webhook&client_id=83554108657.83546957248&client_secret=c3e12113aea0fc064ecba5fbddcd8801&code=' + req.query.code, { q: '#2hack1we' }, function (error, tweets, response) {
   client.get('https://slack.com/api/oauth.access?client_id=83554108657.83546957248&client_secret=c3e12113aea0fc064ecba5fbddcd8801&code=' + req.query.code, { q: '#2hack1we' }, function (error, tweets, response) {
        console.log(tweets);
        var access_token = tweets.access_token;
        var bot_token = tweets.bot.bot_access_token;
        api_token=tweets.bot.bot_access_token;
        console.log("access:" + bot_token);
        var channel = tweets.incoming_webhook.channel_id;


       
        apiToken = bot_token;

        slack = new Slack(apiToken);

        slack.api("users.list", function (err, response) {
            console.log(response);
        });

        slack.api('chat.postMessage', {
            channel: '#webhooksample',
              response_type: 'ephemeral',
            attachments: JSON.stringify([
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
            ])
        }, function (err, response) {
            console.log(response);

            console.log('err ' + err);
            res.render('pages/index', { data: result, content: "content.ejs" });
        });

    });


    //  res.render('pages/index', {data:result, content:"content.ejs"});
});

app.get('/slack', function (req, res) {
    var result = "";
    /*
    client.get('search/tweets', {q: '#2hack1we'}, function(error, tweets, response) {
       console.log(tweets);
    
       result = tweets;
       
    });
       */

    res.render('pages/index', { data: result, content: "slacklogin.ejs" });
});


app.get('/search', function (req, res) {
    var result = "";

    res.setHeader('Content-Type', 'application/json');
    client.get('search/tweets', { q: req.query.search }, function (error, tweets, response) {
        console.log(tweets);

        result = tweets;
        res.send(JSON.stringify(result));
    });


});

app.post('/msg', function (req, res) {
    
    console.log("msg");
    console.log(req.body);
    var result = "ss";
    if(req.body.challenge !=null){
        result=req.body.challenge;
    }


    res.send(result);
});

app.post('/btn', function (req, res) {
    
    console.log("btn");
    console.log(req.body.payload);
    var payload = req.body.payload;
    var action = JSON.parse(payload);
    console.log(action.actions[0].value);
    var result = "ss";
    if(action.actions[0].value !=null){
        result=action.actions[0].value;
    }


    res.send(result);
});
app.post('/cmd', function (req, res) {
    console.log(req);
    console.log(req.body);
    var result = "ssgffff";
    if(req.body.text !=null){
        result=req.body.text;
    }
    
        slack = new Slack(api_token);

     slack.api('chat.postMessage', {
            channel: '#webhooksample',
            response_type: 'ephemeral',
            attachments: JSON.stringify([
                {
                    "text": "Are you sure you want to pay?",
                    "fallback": "You are unable to pay",
                    "callback_id": "wopr_game",
                    "color": "#3AA3E3",
                    "attachment_type": "default",
                    "actions": [
                       /* {
                            "name": "yes",
                            "text": "Yes",
                            "type": "button",
                            "value": "yes"
                        },
                        {
                            "name": "no",
                            "text": "No",
                            "type": "button",
                            "value": "no"
                        },*/
                        {
                            "name": "yes",
                            "text": "Review Payment",
                            "style": "primary",
                            "type": "button",
                            "value": "yes",
                            "confirm": {
                                "title": "Are you sure?",
                                "text": "You want to pay?",
                                "ok_text": "Yes",
                                "dismiss_text": "No"
                            }
                        }
                    ]
                }
            ])
        }, function (err, response) {
            console.log(response);

            console.log('err ' + err);
           
        });

console.log("token:" + api_token);

    res.send(result);
});
app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});