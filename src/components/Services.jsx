import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FaCommentDots, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import './ChatStyles.css';

const Services = () => {
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username] = useState(`User-${uuidv4().substring(0, 8)}`);
  const socketRef = useRef(null);
  const chatRef = useRef(null);

  // Initialize Socket.IO connection
  useEffect(() => {
    socketRef.current = io('http://localhost:5000', {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      autoConnect: true,
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('✅ Connected to server with ID:', socket.id);
      // Send username to server
      socket.emit('user_connected', username);
    });

    socket.on('connect_error', (err) => {
      console.error('❌ Connection error:', err.message);
    });

    // Load chat history when received from server
    socket.on('chat_history', (history) => {
      console.log('📜 Chat history loaded:', history);
      setMessages(history);
    });

    // Listen for incoming messages
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('chat_history');
      socket.off('receive_message');
      socket.disconnect();
    };
  }, [username]);

  // Auto-scroll chat to bottom when messages change
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = useCallback(() => {
    if (!message.trim()) return;

    const newMessage = {
      sender: username,
      text: message,
      timestamp: new Date().toISOString(),
    };

    socketRef.current.emit('send_message', newMessage);
    setMessage('');
  }, [message, username]);

  return (
    <>
      <button 
        className={`chat-toggle-button ${showChat ? 'hidden' : ''}`}
        onClick={() => setShowChat(true)}
      >
        <FaCommentDots />
        <span>Anonymous Chat</span>
      </button>

      {showChat && (
        <div className="chat-window">
          <div className="chat-header">
            <h2>Anonymous Chat</h2>
            <button onClick={() => setShowChat(false)}>
              <FaTimes />
            </button>
          </div>

          <div ref={chatRef} className="chat-messages">
            {messages
              .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
              .map((msg, idx) => (
              <div 
                key={`${msg.timestamp}-${idx}`} 
                className={`message ${msg.sender === username ? 'sent' : 'received'}`}
              >
                <p className="sender">{msg.sender}</p>
                <p className="text">{msg.text}</p>
                <p className="timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
            />
            <button onClick={handleSend}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;
