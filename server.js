var express = require('express');
var fs = require('fs');
var app = express();
var r = require('rethinkdbdash')();


app.use(express.static('public'));

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

app.get('/data', function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    r.db('LoL').table('Summoners').run().then(function (data) {
        console.log(data);
        res.write(JSON.stringify({
            "results": data
        }));
        res.end;
    });
})

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});
