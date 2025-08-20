import React, { useEffect, useState, useRef, useCallback } from "react";
import { FaCommentDots, FaTimes, FaPaperPlane } from "react-icons/fa";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import "./ChatStyles.css";

const Services = () => {
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const username = `User-${uuidv4().substring(0, 8)}`;
  const socketRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    // Connect to live backend
    socketRef.current = io("https://counselling-backend-nelf.onrender.com", {
      transports: ["websocket", "polling"],
      autoConnect: true,
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("✅ Connected to server:", socket.id);
    });

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Connection error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = useCallback(() => {
  if (!message.trim()) return;

  const newMessage = {
    sender: username,
    text: message.trim(),
    timestamp: new Date().toISOString(),
  };

  // Send to backend
  socketRef.current.emit("sendMessage", newMessage);

  // Do NOT add it locally! The backend will broadcast it back
  setMessage("");
}, [message, username]);


  return (
    <>
      <button
        className={`chat-toggle-button ${showChat ? "hidden" : ""}`}
        onClick={() => setShowChat(true)}
      >
        <FaCommentDots /> Anonymous Chat
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
                  className={`message ${
                    msg.sender === username ? "sent" : "received"
                  }`}
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
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
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
