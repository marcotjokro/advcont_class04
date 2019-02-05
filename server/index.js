const express = require("express");
const app = express();

const server = app.listen(9696, (err)=>{
	if(err){
		console.log(err);
		return false;
	}
	
	console.log("Port 9696 is ready");
});

const io = require("socket.io")(server);

io.on("connection", (socket)=>{
	io.emit("user_connected");
	
	socket.on("typed_message", (data)=>{
		console.log(data);
		io.emit("new_message", data);
	});
});
