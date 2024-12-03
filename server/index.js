const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

// Create an Express app and server
const app = express();
const server = http.createServer(app);
const cors = require("cors");

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:5173', // Allow your frontend's origin
    methods: ['GET', 'POST'],       // Allow these HTTP methods
  },
});

app.use(express.json());
app.use(cors({
  origin: `http://localhost:5173`, // Add allowed origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Include all necessary methods
  credentials: true // Allow credentials like cookies
}));

// MongoDB setup (Make sure MongoDB is running)
mongoose.connect('mongodb+srv://rutikakhedkar:4UWPlJHoUreR5rsN@clusterrutika0.ywl8dvo.mongodb.net/chatapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define a message schema for MongoDB
const messageSchema = new mongoose.Schema({
  room: String,
  sender: String,
  content: String,
  timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// Socket.io logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join room event
  socket.on('joinRoom', ({ room, sender }) => {
    socket.join(room);  // Join the room
    console.log(`${sender} joined room: ${room}`);

    // Send previous messages to the user who joined the room
    Message.find({ room }).sort({ timestamp: 1 }).then(messages => {
      socket.emit('previousMessages', messages);
    });
  });

  // Send message event
  socket.on('sendMessage', ({ room, sender, content }) => {
    const newMessage = new Message({ room, sender, content });
    newMessage.save().then(() => {
      io.to(room).emit('receiveMessage', newMessage);  // Broadcast message to the room
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server running on port 3000');
});

