import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';

const steps = [
  {
    id: '0',
    message: 'Welcome to our chatbot! How can I help you today?',
    trigger: '1',
  },
  {
    id: '1',
    user: true,
    trigger: '2',
  },
  {
    id: '2',
    message: 'Sorry, I can only provide limited information. Please contact support for detailed queries.',
    end: true,
  },
];

const ChatbotComponent = () => {
  const [opened, setOpened] = useState(false);

  const toggleChatbot = () => {
    setOpened(!opened);
  };

  const handleEnd = () => {
    setOpened(false); // Close the chatbot when conversation ends
  };

  return (
    <ThemeProvider theme={{ background: '#f5f8fb', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '1000' }}>
        {opened ? (
          <div style={{ position: 'relative', zIndex: '1000' }}>
            <ChatBot
              steps={steps}
              width="400px"
              botAvatar="https://avatars.githubusercontent.com/u/25078601?v=4"
              handleEnd={handleEnd}
            />
            <button
              onClick={toggleChatbot}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: '18px',
                color: '#888',
                zIndex: '2000',
              }}
            >
              &#x2715;
            </button>
          </div>
        ) : (
          <div
            style={{
              cursor: 'pointer',
              width: '40px',
              height: '40px',
              backgroundColor: '#3887be',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
            onClick={toggleChatbot}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              style={{ fill: '#ffffff', transform: 'scale(1.2)' }}
            >
              <path d="M3 18c.7-2.3 2.6-4 5-4s4.3 1.7 5 4H22v3h-6.5c-.6 1.7-2.2 3-4.2 3s-3.6-1.3-4.2-3H3v-3zm8 0c0-1.1.9-2 2-2s2 .9 2 2H11z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default ChatbotComponent;
