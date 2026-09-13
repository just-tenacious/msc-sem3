import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:5000");

function App() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [joined, setJoined] = useState(false);

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("previousMessages", (data) => {
            setMessages(data);
        });

        socket.on("receiveMessage", (data) => {
            setMessages((previousMessages) => [
                ...previousMessages,
                data
            ]);
        });

        return () => {
            socket.off("previousMessages");
            socket.off("receiveMessage");
        };
    }, []);

    const joinRoom = () => {
        if (username.trim() !== "" && room !== "") {
            socket.emit("joinRoom", {
                username,
                room
            });

            setMessages([]);
            setJoined(true);
        }
    };

    const sendMessage = () => {
        if (message.trim() !== "") {
            socket.emit("sendMessage", {
                username,
                message,
                room
            });

            setMessage("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div className="app">

            <div className="page-title">
                <h1>Multi-Room Chat</h1>
                <p>Connect and chat in real time</p>
            </div>

            {!joined ? (

                <div className="join-container">

                    <div className="chat-icon">
                        💬
                    </div>

                    <h2>Join a Room</h2>

                    <p className="subtitle">
                        Choose a room and start chatting
                    </p>

                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <select
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                    >
                        <option value="">
                            Select a room
                        </option>

                        <option value="Cricket">
                            🏏 Cricket
                        </option>

                        <option value="Coding">
                            💻 Coding
                        </option>
                    </select>

                    <button onClick={joinRoom}>
                        Join Room →
                    </button>

                </div>

            ) : (

                <div className="chat-container">

                    <div className="chat-header">

                        <div>
                            <h2>💬 {room}</h2>
                            <span>Room Chat</span>
                        </div>

                        <div className="user-info">
                            <span className="online-dot"></span>
                            {username}
                        </div>

                    </div>

                    <div className="messages">

                        {messages.length === 0 ? (

                            <div className="empty-message">
                                <div>💬</div>
                                <p>No messages yet</p>
                                <span>Start the conversation!</span>
                            </div>

                        ) : (

                            messages.map((msg, index) => (

                                <div
                                    className={
                                        msg.username === username
                                            ? "message own-message"
                                            : "message"
                                    }
                                    key={msg._id || index}
                                >

                                    <div className="message-user">
                                        {msg.username}
                                    </div>

                                    <div className="message-text">
                                        {msg.message}
                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                    <div className="message-box">

                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />

                        <button onClick={sendMessage}>
                            Send
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}

export default App;