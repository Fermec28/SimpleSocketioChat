var http = require ('http');
var path = require('path');
var express = require('express');
var socketio= require('socket.io');

var router= express();
var server= http.createServer(router);
var io = socketio.listen(server);

var assetsPath = path.resolve(__dirname,'public');
router.use(express.static(assetsPath));
var sockets=[];
io.on("connection",function(socket){
	var nickname= "Anonimo";
	socket.on("nickname",function(data) {
		nickname=data;
	});

	sockets.push(socket);
	socket.on("message",function(data){
		
		io.emit("message",{body: data.body, sender:nickname});
		/*sockets.forEach(function(s){
			s.emit("message",data);
		});*/
		
	});

	socket.on("disconnect",function(socket){
		sockets.splice(sockets.indexOf(socket),1);
	});
})

server.listen(process.env.PORT || 3000,function(){
	var address= server.address();
	console.log("chat server listening at port",address.port);
});