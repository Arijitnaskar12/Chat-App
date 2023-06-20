// importing express
const express = require('express');
// setup our express => express allow us to create a server 
const app=express();
// making server using http and express
const server=require('http').Server(app);
// this is the port on which our server will run
app.use(express.static(`public`));
const PORT=9000;
server.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})
// Socket
const io=require('socket.io')(server); 
io.on('connection',(socket)=>{
    console.log("Connected...");
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);
    })
})