const chat = require('./data/chat')

const express = require("express");
const app = express();
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const router = require("./routes"); 
const products = require('./routes/productRouter');
const productsList = require('./routes/productListRouter');

app.set('views', './views');
app.set('view engine', 'ejs');

//middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use("/", router);


io.on('connection', async function(socket) {  
  console.log('Cliente online');

  const messages = await chat.list();
  socket.emit('messages', messages);

  io.sockets.emit('productos'); 
  
  socket.on('new-message', async function (data) {
    try {
      chat.add(data)
      const messages = await chat.list();
      io.sockets.emit('messages', messages);
    } catch (error) {
      throw new Error ('Mensaje no se pudo enviar', error)
    }
  });
});

httpServer.listen(8080, function() {
  console.log('Server up on port 8080');
})