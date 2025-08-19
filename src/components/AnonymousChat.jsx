import React, { useEffect, useRef, useState } from 'react';
import { FaCommentDots, FaTimes } from 'react-icons/fa';

const AnonymousChat = ({ onClose, firstOpen }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (firstOpen) {
      setMessages([
        {
          sender: 'counsellor',
          text: '👋 Welcome! You’re in a safe space. Feel free to share whatever is on your mind — we’re here for you.',
        }
      ]);
    }
  }, [firstOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleTyping = (e) => setNewMessage(e.target.value);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message = {
      sender: 'user',
      text: newMessage.trim(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'counsellor',
          text: "Thank you for sharing. Would you like to talk more about that?",
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col sm:max-w-full sm:w-full sm:h-full">
      {/* Header */}
      <div className="bg-green-700 text-white p-4 flex justify-between items-center">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <FaCommentDots /> Anonymous Chat
        </h3>
        <button onClick={onClose} className="text-white hover:text-gray-200 transition">
          <FaTimes />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[80%] text-sm break-words ${
              msg.sender === 'user'
                ? 'bg-green-100 ml-auto'
                : 'bg-blue-100 mr-auto'
            }`}
          >
            {msg.text}
          </div>
        ))}

        {isTyping && (
          <div className="bg-blue-100 p-3 rounded-lg max-w-[50%] mr-auto">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={handleTyping}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 border p-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnonymousChat;
