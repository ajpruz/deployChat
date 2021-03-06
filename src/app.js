const express = require('express');
const { Server } = require('socket.io')




const app = express();
const PORT = process.env.PORT||8080
const server = app.listen(PORT,()=>console.log(`On port ${PORT}`))
const io = new Server(server);
let log = [];

//Middleware
app.use(express.static(__dirname+"/public"))

io.on('connection',(socket)=>{
    socket.broadcast.emit('newUser')
    socket.emit('log',log)
    socket.on('message',data=>{
        log.push(data);
        io.emit('log',log)
    })
    socket.on('registered',data=>{
        console.log(data)
    })
})