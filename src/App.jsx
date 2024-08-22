
import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import ChatRoom from './ChatRoom';
import './App.css';

function App() {
  const [room, setRoom] = useState('');
  const [newRoom, setNewRoom] = useState('');

  const createRoom = () => {
    if (newRoom) {
      setRoom(newRoom);
      setNewRoom('');
    }
  };

  return (
    <div id="root">
      <h1>Welcome to the Chatroom</h1>
      {room ? (
        <ChatRoom room={room} />
      ) : (
        <div className="card">
          <input
            type="text"
            placeholder="Enter a room name..."
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
          />
          <button onClick={createRoom}>Create or Join Room</button>
        </div>
      )}
    </div>
  );
}

export default App;

