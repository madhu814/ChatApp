const http = require('http');  // Importing the http module
const express = require('express');  // Importing the express module
const path = require('path');    // Importing the path module for handling file paths
const {Server} = require('socket.io'); // Importing the Server class from socket.io

const app = express();    // Creating an instance of express
const server = http.createServer(app); // Creating an HTTP server using the express application
const io = new Server(server); // Creating a new instance of Socket.IO server

io.on('connection', (socket) => { // Listening for new connections to the Socket.IO server
  console.log('A user connected', socket.id); // Logging when a user connects
  
  // Handle incoming messages
  socket.on('sendMessage', (message) => {
    console.log('Message received:', message);
    // Broadcast the message to all connected clients
    io.emit('message', message);
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
})
app.use(express.static(path.resolve(__dirname,'public')));   // Serving static files from the 'public' directory

app.get('/', (req, res) => {  // Defining a route for the root URL
  res.sendFile(__dirname + '/public/index.html'); // Sending the index.html file as
});

server.listen(3000, () => {                             // Starting the server and listening on port 3000
  console.log('Server is running on http://localhost:3000');     // Logging a message to indicate that the server has started
});
