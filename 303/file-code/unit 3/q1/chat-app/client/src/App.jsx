import { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  // Receive real-time messages
  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      setMessages((previousMessages) => [
        ...previousMessages,
        newMessage,
      ]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // Fetch old messages from MongoDB
  useEffect(() => {
    if (!joined) return;

    fetch("http://localhost:5000/messages")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        return response.json();
      })
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error("Error loading messages:", error);
      });
  }, [joined]);

  // Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Join chat
  const joinChat = () => {
    const name = username.trim();

    if (!name) {
      alert("Please enter your username");
      return;
    }

    socket.emit("join", name);
    setUsername(name);
    setJoined(true);
  };

  // Send message
  const sendMessage = () => {
    const text = message.trim();

    if (!text) return;

    socket.emit("sendMessage", {
      username,
      message: text,
    });

    setMessage("");
  };

  // Send with Enter key
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  // Get first letter of username
  const getInitial = (name) => {
    return name?.charAt(0).toUpperCase() || "?";
  };

  return (
    <div className="app">

      {/* ================= JOIN SCREEN ================= */}

      {!joined ? (
        <div className="join-screen">

          <div className="join-card">

            <div className="logo-circle">
              💬
            </div>

            <h1>Real-Time Chat</h1>

            <p className="join-subtitle">
              Connect and chat instantly with others
            </p>

            <div className="input-group">
              <label>Username</label>

              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
                onKeyDown={handleKeyDown}
              />
            </div>

            <button
              className="join-button"
              onClick={joinChat}
            >
              Join Chat
              <span>→</span>
            </button>

            <div className="live-info">
              <span className="live-dot"></span>
              Live chat • Instant messaging
            </div>

          </div>

        </div>
      ) : (

        /* ================= CHAT SCREEN ================= */

        <div className="chat-wrapper">

          {/* Header */}

          <header className="chat-header">

            <div className="header-left">

              <div className="header-logo">
                💬
              </div>

              <div>
                <h2>Real-Time Chat</h2>

                <div className="online-status">
                  <span className="online-dot"></span>
                  <span>Live • Connected</span>
                </div>
              </div>

            </div>

            <div className="user-badge">

              <div className="user-avatar">
                {getInitial(username)}
              </div>

              <div className="user-details">
                <span className="user-name">
                  {username}
                </span>

                <span className="user-label">
                  You
                </span>
              </div>

            </div>

          </header>

          {/* Messages */}

          <main className="messages-container">

            {messages.length === 0 ? (

              <div className="empty-chat">

                <div className="empty-icon">
                  💬
                </div>

                <h3>No messages yet</h3>

                <p>
                  Start the conversation and say hello!
                </p>

              </div>

            ) : (

              <div className="messages-list">

                {messages.map((msg, index) => {

                  const isMine =
                    msg.username === username;

                  return (
                    <div
                      key={msg._id || index}
                      className={`message-row ${
                        isMine ? "mine" : "other"
                      }`}
                    >

                      {/* Avatar */}

                      {!isMine && (
                        <div className="message-avatar">
                          {getInitial(msg.username)}
                        </div>
                      )}

                      <div className="message-content">

                        <div className="message-meta">

                          <span className="message-username">
                            {isMine
                              ? "You"
                              : msg.username}
                          </span>

                          {msg.createdAt && (
                            <span className="message-time">
                              {new Date(
                                msg.createdAt
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          )}

                        </div>

                        <div className="message-bubble">
                          {msg.message}
                        </div>

                      </div>

                    </div>
                  );
                })}

                <div ref={messagesEndRef}></div>

              </div>

            )}

          </main>

          {/* Message Input */}

          <footer className="message-footer">

            <div className="message-input-wrapper">

              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                onKeyDown={handleKeyDown}
              />

              <button
                className="send-button"
                onClick={sendMessage}
                disabled={!message.trim()}
              >
                <span>Send</span>
                <span className="send-icon">➤</span>
              </button>

            </div>

            <div className="footer-text">
              Press <b>Enter</b> to send • Messages are saved securely
            </div>

          </footer>

        </div>
      )}

    </div>
  );
}

export default App;