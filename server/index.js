const express = require('express');
const app = express();
const http =  require("http");
const {Server} = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: "http://222.127.149.101:3002",
        // origin: "*",
        methods:["GET","POST"],
    }
});


io.on("connection", (socket) =>{
    console.log(`User connected : ${socket.id}`);
    
    socket.on("joinuserid",(uid)=>{
        socket.join(uid);
    })

    // socket.on('auto_refresh',(data)=>{
    //     io.in(data).emit('auto_reflect',data);
    // })
    

    socket.on('refresh_action',({uid})=>{
        uid.map((item)=>{
            socket.to(item).emit('auto_reflect')
        })
    })

    socket.on('disconnect',()=>{
        console.log(`Disconnected : ${socket.id}`);
    })
})

server.listen(7001, () =>{
    console.log("SERVER IS RUNNING");
})