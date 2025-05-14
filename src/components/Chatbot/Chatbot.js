import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Send, X, Minimize2, Maximize2, 
  Info, Calendar, FilmIcon, Ticket 
} from 'lucide-react';
import './Chatbot.css';

// Local data for bot responses
const botResponses = {
  greetings: [
    "Hello! I'm your cinema assistant. How can I help you today?",
    "Hi there! Looking to watch a movie?",
    "Welcome to Flick Fusion! How can I assist you?"
  ],
  movies: [
    "We have several movies playing right now including 'Venom: Last Dance' and 'Deadpool & Wolverine'. Would you like to know more?",
    "Our current popular movies include action, comedy and drama. What genre interests you?",
    "You can check out our latest releases and upcoming movies. Which would you prefer?"
  ],
  tickets: [
    "I can help you book tickets. Would you like to see today's showtimes?",
    "Ticket prices range from $10-$25. Would you like to proceed with booking?",
    "You can book tickets online or at our counter. How would you like to proceed?"
  ],
  events: [
    "We have live concerts, comedy shows, and special screenings coming up!",
    "There's a Comic Convention happening next week. Would you like more details?",
    "Check out our events calendar for upcoming shows and performances."
  ],
  default: [
    "I'm not sure I understand. Could you please ask about movies, events, or tickets?",
    "Could you rephrase that? I can help with movies, events, and bookings.",
    "I might have missed that. What would you like to know about our cinema?"
  ]
};

// Helper function to get random response from category
const getRandomResponse = (category) => {
  const responses = botResponses[category] || botResponses.default;
  return responses[Math.floor(Math.random() * responses.length)];
};

const ChatbotQuickAction = ({ icon, text, onClick }) => (
  <button className="quick-action-button" onClick={onClick} aria-label={text}>
    {icon}
    <span>{text}</span>
  </button>
);

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: getRandomResponse('greetings'), 
      sender: "bot", 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getResponseCategory = (input) => {
    const lowercaseInput = input.toLowerCase();
    if (lowercaseInput.includes('hi') || lowercaseInput.includes('hello')) {
      return 'greetings';
    }
    if (lowercaseInput.includes('movie') || lowercaseInput.includes('film')) {
      return 'movies';
    }
    if (lowercaseInput.includes('ticket') || lowercaseInput.includes('book')) {
      return 'tickets';
    }
    if (lowercaseInput.includes('event') || lowercaseInput.includes('show')) {
      return 'events';
    }
    return 'default';
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate bot thinking
    setTimeout(() => {
      const category = getResponseCategory(input);
      const botMessage = {
        id: messages.length + 2,
        text: getRandomResponse(category),
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickAction = (actionText) => {
    setInput(actionText);
    // Focus on input after setting text
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized) {
      setUnreadCount(0);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat button with notification badge */}
      <button 
        className="chatbot-button"
        onClick={toggleChat}
        aria-label="Open chat"
      >
        <MessageSquare size={24} />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className={`chatbot-container ${isMinimized ? 'minimized' : ''}`}>
          <div className="chatbot-header">
            <div className="chatbot-title">
              <MessageSquare size={16} />
              <span>CineBot</span>
            </div>
            <div className="chatbot-actions">
              <button onClick={toggleMinimize} aria-label={isMinimized ? "Maximize" : "Minimize"}>
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button onClick={toggleChat} aria-label="Close chat">
                <X size={16} />
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              <div className="chatbot-messages">
                {messages.map((message) => (
                  <div key={message.id} className={`message ${message.sender}`}>
                    <div className="message-content">
                      <p>{message.text}</p>
                    </div>
                    <span className="message-time">{formatTime(message.timestamp)}</span>
                  </div>
                ))}
                {isLoading && (
                  <div className="message bot">
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Quick action buttons */}
              <div className="quick-actions">
                <ChatbotQuickAction 
                  icon={<FilmIcon size={16} />} 
                  text="What movies are playing?" 
                  onClick={() => handleQuickAction("What movies are playing?")} 
                />
                <ChatbotQuickAction 
                  icon={<Ticket size={16} />} 
                  text="How do I book tickets?" 
                  onClick={() => handleQuickAction("How do I book tickets?")} 
                />
                <ChatbotQuickAction 
                  icon={<Calendar size={16} />} 
                  text="Upcoming events" 
                  onClick={() => handleQuickAction("What events are coming up?")} 
                />
                <ChatbotQuickAction 
                  icon={<Info size={16} />} 
                  text="Help" 
                  onClick={() => handleQuickAction("I need help")} 
                />
              </div>
              
              <form className="chatbot-input" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  ref={inputRef}
                />
                <button type="submit" aria-label="Send message">
                  <Send size={20} />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;