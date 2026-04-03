import React, { useState } from 'react';
import { MessageCircle, Send, User, Clock, Check, CheckCheck } from 'lucide-react';

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [newMessage, setNewMessage] = useState('');

  const [conversations] = useState([
    {
      id: 1,
      name: 'Customer Support',
      avatar: 'CS',
      lastMessage: 'Thank you for your order! Your package will be delivered within 3-5 business days.',
      time: '2 hours ago',
      unread: 2,
      messages: [
        { id: 1, text: 'Hi, I need help with my order #12345', sender: 'user', time: '10:30 AM', status: 'read' },
        { id: 2, text: 'Hello! I\'d be happy to help you with your order. Can you please provide more details about the issue?', sender: 'support', time: '10:35 AM', status: 'read' },
        { id: 3, text: 'The delivery address seems to be incorrect. Can I change it?', sender: 'user', time: '10:40 AM', status: 'read' },
        { id: 4, text: 'Of course! You can update your delivery address in your account settings or I can help you do it right now. What would you prefer?', sender: 'support', time: '10:45 AM', status: 'read' },
        { id: 5, text: 'Please help me update it now.', sender: 'user', time: '10:50 AM', status: 'read' },
        { id: 6, text: 'Thank you for your order! Your package will be delivered within 3-5 business days.', sender: 'support', time: '11:00 AM', status: 'sent' }
      ]
    },
    {
      id: 2,
      name: 'Order Updates',
      avatar: 'OU',
      lastMessage: 'Your order has been shipped and is on its way!',
      time: '1 day ago',
      unread: 0,
      messages: [
        { id: 1, text: 'Your order #12346 has been confirmed and is being prepared for shipment.', sender: 'system', time: 'Yesterday 2:00 PM', status: 'read' },
        { id: 2, text: 'Your order has been shipped and is on its way!', sender: 'system', time: 'Yesterday 4:30 PM', status: 'read' }
      ]
    },
    {
      id: 3,
      name: 'Promotions',
      avatar: 'PR',
      lastMessage: '🎉 Flash Sale! Get 50% off on selected electronics!',
      time: '3 days ago',
      unread: 1,
      messages: [
        { id: 1, text: '🎉 Flash Sale! Get 50% off on selected electronics! Limited time offer - don\'t miss out!', sender: 'promo', time: '3 days ago', status: 'unread' }
      ]
    }
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send to backend
      alert('Message sent! (This is a demo - messages are not actually sent)');
      setNewMessage('');
    }
  };

  const getMessageStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3 h-3 text-[#8B96A5]" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-[#8B96A5]" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-[#0D6EFD]" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="bg-white border border-[#DEE2E7] rounded-md h-[600px] flex">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-[#DEE2E7]">
          <div className="p-4 border-b border-[#DEE2E7]">
            <h1 className="text-xl font-bold text-[#1C1C1C]">Messages</h1>
          </div>

          <div className="overflow-y-auto h-full">
            {conversations.map((conversation, index) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(index)}
                className={`p-4 border-b border-[#DEE2E7] cursor-pointer hover:bg-gray-50 ${
                  selectedConversation === index ? 'bg-blue-50 border-l-4 border-l-[#0D6EFD]' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#0D6EFD] rounded-full flex items-center justify-center text-white font-semibold">
                    {conversation.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-[#1C1C1C] truncate">{conversation.name}</h3>
                      <span className="text-xs text-[#8B96A5]">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-[#8B96A5] truncate mt-1">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <div className="w-5 h-5 bg-[#FF9017] rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-semibold">{conversation.unread}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation !== null && (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-[#DEE2E7] flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#0D6EFD] rounded-full flex items-center justify-center text-white font-semibold">
                  {conversations[selectedConversation].avatar}
                </div>
                <div>
                  <h2 className="font-semibold text-[#1C1C1C]">{conversations[selectedConversation].name}</h2>
                  <p className="text-sm text-[#8B96A5]">Active now</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversations[selectedConversation].messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-[#0D6EFD] text-white'
                          : message.sender === 'system'
                          ? 'bg-gray-100 text-[#1C1C1C]'
                          : 'bg-gray-100 text-[#1C1C1C]'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className={`flex items-center justify-end mt-1 space-x-1 ${
                        message.sender === 'user' ? 'text-blue-200' : 'text-[#8B96A5]'
                      }`}>
                        <span className="text-xs">{message.time}</span>
                        {message.sender === 'user' && getMessageStatusIcon(message.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-[#DEE2E7]">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 border border-[#DEE2E7] rounded px-3 py-2 focus:outline-none focus:border-[#0D6EFD]"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-[#0D6EFD] text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;