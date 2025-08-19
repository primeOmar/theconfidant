// AdminMessages.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Fetch initial messages
    const fetchMessages = async () => {
      const response = await fetch('/api/messages');
      const data = await response.json();
      setMessages(data);
    };
    
    fetchMessages();
    
    // Set up WebSocket connection
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);
    
    newSocket.on('newMessage', (message) => {
      setMessages(prev => [message, ...prev]);
    });
    
    return () => newSocket.close();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Messages from Clients</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {messages.map((message) => (
              <tr key={message._id}>
                <td className="px-6 py-4 whitespace-nowrap">{message.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{message.email}</td>
                <td className="px-6 py-4">{message.message}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(message.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMessages;