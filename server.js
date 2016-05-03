var express = require('express');
var fs = require('fs');
var app = express();
var r = require('rethinkdbdash')();
var request = require("request");
var prompt = require('prompt');
var key = "";
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));

//general page for our website
app.get('/', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.readFile('public/index.html', 'utf8', function (err, data) {
        if (err) {
            throw err;
        }
        res.write(data);
        res.end;
    });
});

//Gathers the data from our database
app.get('/data', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    r.db('LoL').table('Summoners').run().then(function (data) {
        console.log(data);
        //When sending actual data, don't use stringify!!
        res.send(JSON.stringify({
            "results": data
        }, null, 4));
    });
});

//Gathers the data from our database
app.get('/temp', function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    fs.readFile('public/../players.json', 'utf8', function(err, data){
        if(err){
            throw err;
        }
        var parsed = JSON.parse(data);

        for(var i=0; i < parsed['Players'].length; i++){
            var j = parsed['Players'][i];
            console.log('Player: ' + j['Player']);
            res.write("Player: ")
        }

        //res.send(parsed);
    });
});

//Call Riot's API and gather the users Data
app.get('/user/:name', function (req, res) {
    var name = req.params.name;
    console.log("getting user " + req.params.name);
    res.setHeader('Content-Type', 'application/json');
    request.get("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + name + "?api_key=" + key, function(data,
    response, body){
        res.send(JSON.parse(body));
    }).on("error", function(e){
        console.log("Error: " + e.message);
    });
});

//Schema used for the prompt
var schema = {
    properties:{
        key:{
            message: "Please enter in riot key: ",
            required: true
        }
    }
};

//Prompt for the API key and start the server
prompt.get(schema, function(err, result){
    key = result.key;
    console.log('key: ' + key.toString());
    app.listen(3000, function(){
        console.log('Server listening on port 3000');
    });
})




