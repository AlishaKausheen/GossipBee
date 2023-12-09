


//node server that will handle socket io connection
//const io = require('socket.io')(8000);

//const users = {};
//io.on is socket.io instance that will listen many instances
//socket.on will be responsible for a particular instance
//broadcast.emit will send broadcast to everyone except
// that individual that he joined
/*io.on('connection', socket => {
    socket.on('new-user-joined', name => {
    

users[socket.id] = name;
      socket.broadcast.emit('user-joined', name)
    });   
    socket.on('send', message => {
        socket.broadcast.emit('recieve', { message: message, name: users[socket.id] })
    });
})*/
const http = require('http');
const express = require('express');
const path = require('path')
const { Server } = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = {};

app.use(express.static(path.resolve('./public')));
app.get('/', (req, res) => {
    return res.sendFile('/public/index.html');
})

//Socket.io
io.on('connection', (socket) => {
    socket.on('new-user-joined', (name) => {

        users[socket.id] = name;
        console.log(name)
        socket.broadcast.emit("user-joined", name);
    })
    socket.on('send', (message) => {
        socket.broadcast.emit('recieve', { message: message, name: users[socket.id] })
    });
})

server.listen(9000, () =>
    console.log('Server started')
)