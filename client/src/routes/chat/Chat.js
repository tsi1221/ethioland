import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Chat.css';

// Helper to format date/time nicely
const formatTime = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Chat = () => {
  const { currentUser } = useContext(AuthContext);

  // Messages now have a timestamp field
  const [messages, setMessages] = useState([
    {
      sender: 'user',
      text: 'Hello, I’m interested in your property.',
      time: new Date(new Date().getTime() - 600000), // 10 mins ago
    },
    {
      sender: 'agent',
      text: 'Hi! Feel free to ask anything.',
      time: new Date(new Date().getTime() - 540000), // 9 mins ago
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [lastSeen, setLastSeen] = useState(null);

  // Update last seen whenever messages change, for example currentUser last message time
  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      setLastSeen(lastMsg.time);
    }
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim() === '') return;
    const msg = {
      sender: 'user',
      text: newMessage,
      time: new Date(),
    };
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      {/* Profile section */}
      <div className="chat-profile">
        <div className="chat-avatar">
          {/* Example avatar, replace with user's actual avatar URL */}
          <img
            src={`https://ui-avatars.com/api/?name=${currentUser?.name || 'M'}`}
            alt="User Avatar"
          />
        </div>
        <div className="chat-user-info">
          <div className="chat-username">{currentUser?.name || 'mahi'}</div>
          <div className="chat-last-seen">
            Last seen: {lastSeen ? lastSeen.toLocaleString() : 'N/A'}
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${msg.sender === 'user' ? 'user' : 'agent'}`}
          >
            <div className="message-text">{msg.text}</div>
            <div className="message-time">{formatTime(new Date(msg.time))}</div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
