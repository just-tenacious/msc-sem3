import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:5000");

function App() {
    const [username, setUsername] = useState("");
    const [joined, setJoined] = useState(false);

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

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

    useEffect(() => {
        socket.on("receiveMessage", (newMessage) => {
            setMessages((previousMessages) => [
                ...previousMessages,
                newMessage
            ]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, []);

    const sendMessage = () => {
        const text = message.trim();

        if (!text) return;

        // Add message with "sent" status
        const tempMessage = {
            username,
            message: text,
            time: new Date().toLocaleTimeString(),
            status: "sent"
        };

        setMessages((previousMessages) => [
            ...previousMessages,
            tempMessage
        ]);

        // Send message with acknowledgment callback
        socket.emit(
            "sendMessage",
            {
                username,
                message: text
            },
            (response) => {
                if (response.status === "delivered") {
                    setMessages((previousMessages) => {
                        const updatedMessages = [...previousMessages];

                        for (let i = updatedMessages.length - 1; i >= 0; i--) {
                            if (
                                updatedMessages[i].username === username &&
                                updatedMessages[i].message === text &&
                                updatedMessages[i].status === "sent"
                            ) {
                                updatedMessages[i] = {
                                    ...updatedMessages[i],
                                    status: "delivered"
                                };

                                break;
                            }
                        }

                        return updatedMessages;
                    });
                }
            }
        );

        setMessage("");
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div className="app">

            {!joined ? (
                <div className="join-screen">

                    <div className="join-card">

                        <div className="logo">
                            💬
                        </div>

                        <h1>Message Chat</h1>

                        <p>
                            Real-time chat with delivery acknowledgment
                        </p>

                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            onKeyDown={handleKeyDown}
                        />

                        <button onClick={joinChat}>
                            Join Chat →
                        </button>

                    </div>

                </div>
            ) : (
                <div className="chat-container">

                    <header className="chat-header">

                        <div>
                            <h2>💬 Message Chat</h2>

                            <span>
                                🟢 Connected • Real-time
                            </span>
                        </div>

                        <div className="user-info">
                            <div className="avatar">
                                {username.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <strong>{username}</strong>
                                <small>You</small>
                            </div>
                        </div>

                    </header>

                    <main className="messages">

                        {messages.length === 0 ? (
                            <div className="empty">
                                <div>💬</div>

                                <h3>No messages yet</h3>

                                <p>
                                    Send your first message!
                                </p>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div
                                    className={
                                        msg.username === username
                                            ? "message-row mine"
                                            : "message-row"
                                    }
                                    key={index}
                                >

                                    <div className="message">

                                        <div className="message-top">

                                            <strong>
                                                {msg.username === username
                                                    ? "You"
                                                    : msg.username}
                                            </strong>

                                            <span>
                                                {msg.time}
                                            </span>

                                        </div>

                                        <div className="bubble">
                                            {msg.message}
                                        </div>

                                        {msg.username === username && (
                                            <div className="status">

                                                {msg.status === "delivered"
                                                    ? "✓✓ Delivered"
                                                    : "✓ Sent"}

                                            </div>
                                        )}

                                    </div>

                                </div>
                            ))
                        )}

                    </main>

                    <footer className="input-area">

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
                            onClick={sendMessage}
                            disabled={!message.trim()}
                        >
                            Send ➤
                        </button>

                        <div className="hint">
                            Press <b>Enter</b> to send
                        </div>

                    </footer>

                </div>
            )}

        </div>
    );
}

export default App;