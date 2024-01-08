const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io")
const cors = require("cors");

const PORT = 3000;

app.use(cors());
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});


io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.emit("socket_id", socket.id);
    

    socket.on("name", (data) => {
        socket.name = data;
        console.log(socket.name);
    })

    socket.on("join_room", (data) => {
        socket.join(data);
    })

    socket.on("send_message", (data) => {
        console.log(data.name + "msg");
        //socket.broadcast.emit("receive_message", data)  //broadcast sends to everyone except you
        socket.to(data.room).emit("receive_message", data)
    })
})


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})