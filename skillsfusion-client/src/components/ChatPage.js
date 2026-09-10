import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import './ChatPage.css';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const stompClientRef = useRef(null);
  const messagesEndRef = useRef(null);

  const senderEmail = localStorage.getItem('userEmail');
  const receiverEmail = searchParams.get('to');
  const nameFromParams = searchParams.get('name');

  const displayName = receiverName || nameFromParams || receiverEmail;
  const initial = displayName ? displayName.charAt(0).toUpperCase() : '?';

  const fetchMessages = async () => {
    try {
      const res = await fetch(
        `http://localhost:8081/api/chat/messages?user1=${senderEmail}&user2=${receiverEmail}`
      );
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // If we weren't handed a name via the URL, look it up
  useEffect(() => {
    if (nameFromParams || !receiverEmail) return;

    fetch(`http://localhost:8081/api/auth/${receiverEmail}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.name) setReceiverName(data.name);
      })
      .catch((err) => console.error('Error fetching user name:', err));
  }, [receiverEmail, nameFromParams]);

  // Auto-scroll to the latest message whenever the list changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    fetchMessages();

    const client = new Client({
      webSocketFactory: () => new SockJS(`http://localhost:8081/ws?email=${senderEmail}`),
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe('/user/queue/messages', (frame) => {
          const incoming = JSON.parse(frame.body);
          if (incoming.senderEmail === receiverEmail || incoming.receiverEmail === receiverEmail) {
            setMessages((prev) => [...prev, incoming]);
          }
        });
      },
    });

    client.activate();
    stompClientRef.current = client;

    return () => client.deactivate();
  }, [receiverEmail]);

  const sendMessage = () => {
    if (!text.trim() || !stompClientRef.current?.connected) return;
    stompClientRef.current.publish({
      destination: '/app/chat.send',
      body: JSON.stringify({ senderEmail, receiverEmail, message: text }),
    });
    setText('');
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-header-row">
          <button onClick={() => navigate('/')} className="back-button" aria-label="Back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="white"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="chat-avatar">{initial}</div>
          <div className="chat-header-info">
            <h2 className="chat-header">{displayName}</h2>
            <span className="chat-status">
              <span className="status-dot" /> Online
            </span>
          </div>
        </div>

        <div className="message-area">
          {messages.map((msg, index) => (
            <div key={index} className="message-row">
              <div
                className={`message-bubble ${
                  msg.senderEmail === senderEmail ? 'message-sent' : 'message-received'
                }`}
              >
                <p style={{ margin: 0 }}>{msg.message}</p>
                <span className="timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="chat-input"
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage} className="send-button" aria-label="Send">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 20L21 12L3 4V10L16 12L3 14V20Z" fill="white" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;