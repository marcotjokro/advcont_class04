<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
		<div>Status</div>
		<input type="text" placeholder="Username" v-model="username"/>
		<input type="text" placeholder="Type your message here" v-model="message"/>
		<button @click="sendMessage">Send</button>
		
		<div v-for="m in allMessages">
			{{m.username}} - {{m.message}}
		</div>
  </div>
</template>

<script>
	// @ is an alias to /src
	import io from "socket.io-client";

	export default {
		name: 'home',
		data(){
			return {
				socket: io("http://142.232.125.53:9696"),
				message:"",
				username:"default",
				allMessages:[]
			}
		},
		mounted(){
			this.socket.on("user_connected", (data)=>{
//				alert("Someone is on this site");
			});
			this.socket.on("new_message", (data)=>{
				this.allMessages.unshift(data);
			});
		},
		methods:{
			sendMessage: function(){
				var obj = {
					username: this.username,
					message: this.message
				}
				this.socket.emit("typed_message", obj);
			}
		}
	}
</script>
