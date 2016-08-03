var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '/'));
var http = require('http').Server(app);
var io = require('socket.io')(http);

//var http = require('http').Server(app);
//var io = require('socket.io')(http);


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});



io.on('connection',function(socket){
    socket.on('connecton', function(){
       console.log('Wow');
    });
});

http.listen(3000, function(){
    console.log('server started on Port 3000');
});
