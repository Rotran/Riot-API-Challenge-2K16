var r = require('rethinkdbdash')();
var request = require("request");
var prompt = require('prompt');
var fs = require('fs');
var validInputs = {};
var key = '';

validInputs.input = ['createDB'];

var input = {
    properties: {
        action: {
            message: "Enter what you would like to do",
            required: true
        }
    }
}

prompt.get(input, function (err, result) {
    if (err) {
        console.log(err);
    }

    fs.readFile('key.config', 'utf8', function(err, data){
        key = data;
    });

    console.log('got: ' + result['action']);
    if (result.action == "createDB") {
        var act = result['action'];
        validInputs[act](key);
    }
    //do api calls here


});

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
