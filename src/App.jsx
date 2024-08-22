import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useParams } from 'react-router-dom';
import firebase from './firebase';
import ChatRoom from './ChatRoom';
import './App.css';

function App() {
  return (
    <Router>
      <div id="root">
        <h1>Welcome to the Chatroom</h1>
        <Routes>
          <Route path="/" element={<RoomRedirect />} />
          <Route path="/:room" element={<ChatRoomWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

const RoomRedirect = () => {
  const [newRoom, setNewRoom] = useState('');
  const navigate = useNavigate();

  const createRoom = () => {
    if (newRoom) {
      navigate(`/${newRoom}`);
    }
  };

  return (
    <div className="card">
      <input
        type="text"
        placeholder="Enter a room name..."
        value={newRoom}
        onChange={(e) => setNewRoom(e.target.value)}
      />
      <button onClick={createRoom}>Create or Join Room</button>
    </div>
  );
};

const ChatRoomWrapper = () => {
  const { room } = useParams();
  return <ChatRoom room={room} />;
};

export default App;
