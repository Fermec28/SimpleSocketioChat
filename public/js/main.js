$(document).ready(function(){
	var nickname = window.prompt("¿Pon tu Nombre?","Alejandra");
	var socket = io.connect();
	var $message= $(".emoji-wysiwyg-editor");
	var $messageForm = $("#message-form");
	var $messages= $("#messages-list")
	socket.on("connect",function(){
		socket.emit("nickname",nickname);

		$messageForm.on("submit",function(event){
			event.preventDefault();
			var messageText = $message.html();			
			socket.emit("message",{body: messageText});
			$message.val("");
		});

		socket.on("message",function(data){
			console.log(data);
			var csscolor =  (data.sender == nickname?  'mymessage' : 'othermessage')
			$messages.append("<li class='message "+csscolor+"' > <p style='text-align:left'>"+data.sender+" says: </p> <p>"+ data.body+"</p></li>")
			$message.html("");
		})
	})
});

