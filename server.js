var express = require('express');
var fs = require('fs');
var app = express();
app.use(express.static('public'));

app.get('/', function(req, res){
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.readFile('public/index.html', 'utf8', function(err, data){
        if(err) throw err;
        res.write(data);
        res.end;
    });
});

app.listen(3000, function(){
    console.log('Server listening on port 3000');
});
