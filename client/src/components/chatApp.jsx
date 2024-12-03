import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://chartufy-2-ba5d.vercel.app/');  // Connect to backend server

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sender, setSender] = useState('User1');  // User's name
  const [room, setRoom] = useState('room1');  // Room name

  // Join the room and fetch previous messages
  useEffect(() => {
    socket.emit('joinRoom', { room, sender });  // Emit 'joinRoom' event to backend

    // Listen for previous messages when joining the room
    socket.on('previousMessages', (messages) => {
      setMessages(messages);  // Set the previous messages
    });

    // Clean up the listener when the component unmounts
    return () => {
      socket.off('previousMessages');
    };
  }, [room, sender]);

  // Handle sending a message
  const sendMessage = () => {
    socket.emit('sendMessage', { room, sender, content: newMessage });  // Emit message to backend
    setNewMessage('');  // Clear the input field
  };

  // Listen for incoming messages
  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);  // Add the new message
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  return (
    <div>
      <h3>Chat Room: {room}</h3>
      <div>
        {messages.map((msg, index) => (
          <div key={index}><strong>{msg.sender}:</strong> {msg.content}</div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatApp;
