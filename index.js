var express = require('express');
var socket = require('socket.io');

var app = express();

var server = app.listen(8000,function(){

    console.log("Then server is listening on the port 8000.")
});


app.use(express.static('public'));

var io = socket(server);

io.on('connection',function(socket){
    //console.log(socket.id);
    console.log('user connected');
    socket.on("chat", function(data){
        io.sockets.emit("chat",data);
    })

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on("typing", function(data){

        socket.broadcast.emit("typing",data);
    })
});