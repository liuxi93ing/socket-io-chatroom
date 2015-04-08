var app1 = require('express');
var app = app1();

var http1 = require('http');
var http = http1.Server(app);

var io1 = require('socket.io');
var io = io1(http);

app.get('/',function(req,res){
	
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.broadcast.emit('hi');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});