var r = require('rethinkdbdash')();
var request = require("request");
var prompt = require('prompt');
var fs = require('fs');
var validInputs = {};
var key = '';

validInputs.input = ['createDB', 'install'];

var input = {
    properties: {
        action: {
            message: "Enter what you would like to do, createDB or install. Max use Install!!",
            required: true
        }
    }
}

prompt.get(input, function (err, result) {
    if (err) {
        console.log(err);
    }

    fs.readFile('key.config', 'utf8', function (err, data) {
        key = data;
    });
    var act = result['action'];
    console.log('got: ' + result['action']);
    if (result.action == "createDB") {
        validInputs[act](key);
    } else if (result.action == 'install') {
        validInputs[act]();
    }
    //do api calls here


});

validInputs.install = function () {
    fs.readFile('public/../players.json', 'utf8', function (err, data) {
        if (err) {
            throw err;
        }
        var parsed = JSON.parse(data);
        for (var i = 0; i < parsed['LCS'].length; i++) {
            var id = parsed['LCS'][i]['ID'];
            console.log(key + " Sanity: " + parsed['LCS'][0]['Summoner']);
            request.get("https://na.api.pvp.net/championmastery/location/NA1/player/" + id + "/topchampions?api_key=" + key, function (data, respone, body) {
                console.log('we got the data duude');
                console.log(body);
                //if body is an empty array we should say fuck it
                //and not update
                r.db('LoL').table('Summoners').insert({
                    id: id,
                    "Summoner": parsed['LCS'][0]['Summoner'], //the i here didin't get carried through wtf
                    "Player": parsed['LCS'][0]["Player"],
                    "Team": parsed['LCS'][0]["Team"],
                    "Champs": JSON.parse(body)
                }, {
                    conflict: "replace"
                }).run().then(function (result) {
                    console.log("db updated");
                });
            });
        }
    })
};

validInputs.createDB = function (key) {
    console.log('Creating db!!');
    r.db("LoL").table("Summoners").delete().run().then(function () {
        console.log("deleted")
    });
    r.db('LoL').table('Summoners').insert([{
            name: "Max Tran",
            id: "23456",
            lastUpdated: "4/30/16/8:49PM",
            team: "NABronzies",
            champs: [
                {
                    name: "Lucian",
                    level: "3",
                    points: "55",
                    highestGrade: "B",
                    id: "22",
                    chest: true,
                    lastPlayTime: 444444,
                    championPointsUntilNextLevel: 123,
                    championPointsSinceLastLevel: 44
            },
                {
                    name: "Annie",
                    level: "2",
                    points: "22",
                    highestGrade: "C+",
                    id: "21",
                    chest: false,
                    lastPlayTime: 23234,
                    championPointsUntilNextLevel: 44,
                    championPointsSinceLastLevel: 44
            },
                {
                    name: "Nocturne",
                    level: "5",
                    points: "33",
                    highestGrade: "S",
                    id: "23",
                    chest: true,
                    lastPlayTime: 1343434,
                    championPointsUntilNextLevel: 444,
                    championPointsSinceLastLevel: 44
            }
        ]
    },
        {
            name: "Wesley Rogers",
            id: "123456",
            lastUpdated: "4/30/16/8:49PM",
            team: "NABronzies",
            champs: [
                {
                    name: "Annie",
                    level: "3",
                    points: "55",
                    highestGrade: "B",
                    id: "21",
                    chest: true,
                    lastPlayTime: 1343434,
                    championPointsUntilNextLevel: 444,
                    championPointsSinceLastLevel: 44
                },
                {
                    name: "Nocturne",
                    level: "5",
                    points: "33",
                    highestGrade: "S",
                    id: "23",
                    chest: false,
                    lastPlayTime: 1343434,
                    championPointsUntilNextLevel: 444,
                    championPointsSinceLastLevel: 44
                },
                {
                    name: "Lucian",
                    level: "3",
                    points: "55",
                    highestGrade: "B",
                    id: "22",
                    chest: true,
                    lastPlayTime: 1343434,
                    championPointsUntilNextLevel: 444,
                    championPointsSinceLastLevel: 44
                }
            ]
        }]).run().then(function (result) {
        console.log("we ran!");
    });
};
