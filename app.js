const express = require('express');
const app = express();
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
const path = require('path'); 

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); 

io.on("connection",function(socket){
    socket.on("sendLocation",function(data){
        io.emit("recieve-location",{id:socket.id,...data});
    })
    socket.on("disconnect",function(){
        io.emit("user-dissconnected",socket.id)
    })
    console.log("a new client connected");
});
app.get("/", function(req, res) {
    res.render("index");
});

server.listen(3000, function() {
    console.log("Server is running on port 3000");
});
