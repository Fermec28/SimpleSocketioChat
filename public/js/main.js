$(document).ready(function(){
	var nickname = window.prompt("¿Pon tu Nombre?","Alejandra");
	var socket = io.connect();
	var $message= $("#message");
	var $messageForm = $("#message-form");
	var $messages= $("#messages-list")
	socket.on("connect",function(){
		socket.emit("nickname",nickname);

		$messageForm.on("submit",function(event){
			event.preventDefault();
			var messageText = $message.val();
			$message.val("");
			socket.emit("message",{body: messageText});
		});

		socket.on("message",function(data){
			console.log(data);
			var csscolor =  (data.sender == nickname?  'mymessage' : 'othermessage')
			$messages.append("<li class='message "+csscolor+"'> <p style='text-align:left'>"+data.sender+" says: </p> <p>"+ data.body+"</p></li>")
		})
	})
});

