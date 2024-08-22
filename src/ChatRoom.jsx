import React, { useState, useEffect, useRef } from 'react';
import firebase from './firebase';
import './ChatRoom.css';

function ChatRoom({ room }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState(`User-${Math.floor(Math.random() * 10000)}`);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const messagesRef = firebase.database().ref('chatrooms').child(room);
    messagesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
      }
    });
  }, [room]);

  const sendMessage = () => {
    if (input.length > 0 && input.length <= 1000) {
      const messageRef = firebase.database().ref('chatrooms').child(room);
      const newMessage = {
        text: input,
        user: username,
        timestamp: new Date().toISOString(),
      };
      messageRef.push(newMessage);
      setInput('');
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 15 * 1024 * 1024) {
      try {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`${room}/${encodeURIComponent(file.name)}`);
        await fileRef.put(file);
        const url = await fileRef.getDownloadURL();
        
        const messageRef = firebase.database().ref('chatrooms').child(room);
        const newMessage = {
          text: `<img src="${url}" alt="${file.name}" style="max-width: 100%; height: auto;"/>`,
          user: username,
          timestamp: new Date().toISOString(),
        };
        messageRef.push(newMessage);
        setTimeout(() => fileRef.delete(), 15 * 60 * 1000);
      } catch (error) {
        console.error("File upload error:", error.message);
        alert("Failed to upload file. Please check your permissions.");
      }
    }
  };

  return (
    <div className="chatroom">
      <h2>Room: {room}</h2>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <span className="message-user">{message.user}</span>: <span className="message-text" dangerouslySetInnerHTML={{ __html: message.text }} />
            <span className="message-timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
      <button onClick={() => fileInputRef.current.click()}>Upload File</button>
    </div>
  );
}

export default ChatRoom;

