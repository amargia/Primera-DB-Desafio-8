const express = require("express");
const app = express();
const fetch = require('node-fetch');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


const router = require("./routes") 


app.set('views', './views');
app.set('view engine', 'ejs');

//middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use("/", router);


const messages = [];


io.on('connection', function(socket) {  
  console.log('Cliente online');   
  socket.emit('messages', messages);
  
  fetch('http://localhost:8080/lista-productos')
  .then(response => response.json())
  .then(data => {io.sockets.emit('productos', data)}); 
  
  socket.on('new-message',data => {
    messages.push(data);
    io.sockets.emit('messages', messages);
  });

});

httpServer.listen(8080, function() {
  console.log('Server up on port 8080');
})