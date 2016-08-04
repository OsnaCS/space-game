/****************** initialize ******************/
var config = require('./serverconfig.json');
var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '/'));
var http = require('http').Server(app);
var io = require('socket.io')(http);

//var http = require('http').Server(app);
//var io = require('socket.io')(http);

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : config.db_host,
    user     : config.db_user,
    password : config.db_pass,
    database : config.db_name
});

connection.query(
    'CREATE TABLE IF NOT EXISTS highscore ('
        +'id INT NOT NULL AUTO_INCREMENT,'
        +'player VARCHAR(255) NOT NULL,'
        +'score LONG,'
        +'level INT DEFAULT 1,'
        +'PRIMARY KEY (id));');

connection.query('REPLACE INTO highscore VALUES (?, ?, ?, ?);', [1, "Superstar McAwesome", 99, 999999], function(err, result) {if (err) throw err;});
connection.query('REPLACE INTO highscore VALUES (?, ?, ?, ?);', [2, "Awesomestar McSuper", 87, 781287], function(err, result) {if (err) throw err;});
connection.query('REPLACE INTO highscore VALUES (?, ?, ?, ?);', [3, "Galactic Megastar", 74, 612735], function(err, result) {if (err) throw err;});
connection.query('REPLACE INTO highscore VALUES (?, ?, ?, ?);', [4, "Starlord", 68, 572398], function(err, result) {if (err) throw err;});
connection.query('REPLACE INTO highscore VALUES (?, ?, ?, ?);', [5, "Captain Sweatpants", 63, 512387], function(err, result) {if (err) throw err;});
connection.query('REPLACE INTO highscore VALUES (?, ?, ?, ?);', [6, "Space Cowboy", 55, 498124], function(err, result) {if (err) throw err;});
connection.query('REPLACE INTO highscore VALUES (?, ?, ?, ?);', [7, "Galaxy President", 47, 417615], function(err, result) {if (err) throw err;});
connection.query('REPLACE INTO highscore VALUES (?, ?, ?, ?);', [8, "Rakete", 41, 381726], function(err, result) {if (err) throw err;});
connection.query('REPLACE INTO highscore VALUES (?, ?, ?, ?);', [9, "Kosmonaut", 36, 291876], function(err, result) {if (err) throw err;});
connection.query('REPLACE INTO highscore VALUES (?, ?, ?, ?);', [10, "Astronaut", 25, 198417], function(err, result) {if (err) throw err;});

/****************** routes ******************/

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : config.db_host,
    user     : config.db_user,
    password : config.db_pass,
    database : config.db_name
});

connection.query(
    'CREATE TABLE IF NOT EXISTS highscore ('
    +'id INT NOT NULL AUTO_INCREMENT,'
    +'player VARCHAR(255) NOT NULL,'
    +'score LONG,'
    +'level INT DEFAULT 1,'
    +'PRIMARY KEY (id));');

connection.query('REPLACE INTO highscore VALUES (?, ?, ?, ?);', [1, "Superstar McAwesome", 10, 10000], function(err, result) {if (err) throw err;});
connection.query('REPLACE INTO highscore VALUES (?, ?, ?, ?);', [2, "Irgendwas", 9, 8750], function(err, result) {if (err) throw err;});
connection.query('REPLACE INTO highscore VALUES (?, ?, ?, ?);', [3, "Sombra, Emperor of the Galaxy", 7, 5400], function(err, result) {if (err) throw err;});
connection.query('REPLACE INTO highscore VALUES (?, ?, ?, ?);', [4, "Tarkan", 5, 3100], function(err, result) {if (err) throw err;});
connection.query('REPLACE INTO highscore VALUES (?, ?, ?, ?);', [5, "Dönerblitz", 4, 2400], function(err, result) {if (err) throw err;});
connection.query('REPLACE INTO highscore VALUES (?, ?, ?, ?);', [6, "Space Cowboy", 3, 1900], function(err, result) {if (err) throw err;});
connection.query('REPLACE INTO highscore VALUES (?, ?, ?, ?);', [7, "Blinky", 2, 1100], function(err, result) {if (err) throw err;});
connection.query('REPLACE INTO highscore VALUES (?, ?, ?, ?);', [8, "Henry", 2, 980], function(err, result) {if (err) throw err;});
connection.query('REPLACE INTO highscore VALUES (?, ?, ?, ?);', [9, "Kosmonaut Anton", 1, 340], function(err, result) {if (err) throw err;});
connection.query('REPLACE INTO highscore VALUES (?, ?, ?, ?);', [10, "Bob", 1, 100], function(err, result) {if (err) throw err;});





app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/1/highscore', function(req, res) {
    connection.query("SELECT * FROM highscore", function (err, rows, fields) {
        if (err) throw err;

        var result = rows.sortOn("player");
        res.json(result);
    });
});

app.post("/api/1/highscore", function(req, res) {
    var highscore = req.body;
    connection.query("INSERT INTO highscore (player, score, level) VALUES (?, ?, ?)", [highscore.player, highscore.score, highscore.level], function(err, result) {
        if (err) {
            res.send({status: 1, message: "Failed to post new highscore"});
        } else {
            res.send({status: 0, message: "Successfully posted new highscore"});
        }
    })
});

/****************** io & listen ******************/

io.on('connection',function(socket){
    socket.on('connecton', function(){
       console.log('Wow');
    });
    socket.on('chat message',function(msg){
        console.log(msg);
        socket.emit('chat message', msg);
    });
});

http.listen(3000, function(){
    console.log('server started on Port 3000');
});



/****************** util ******************/

Array.prototype.sortOn = function(key, asc){
    this.sort(function(a, b){
        if(a[key] < b[key]){
            return -1;
        }else if(a[key] > b[key]){
            return 1;
        }
        return 0;
    });
    this.reverse();
};
