var r = require('rethinkdbdash')();
var request = require("request");
var prompt = require('prompt');
var validInputs = {};

validInputs.input = ['createDB'];

var input = {
    properties: {
        key: {
            message: "Please enter api key: ",
            required: true
        },
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
    var key = result.key;
    console.log('got: ' + result['action']);
    if (result.action == "createDB") {
        var act = result['action'];
        validInputs[act](key);
    }
    //do api calls here


});

validInputs.createDB = function (key) {
    console.log('Creating db!!');

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
                    id: "22"
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
                    id: "21"
            }
    ]
    }
                                          ]).run().then(function(result){
        console.log("we ran!");
    });

};
