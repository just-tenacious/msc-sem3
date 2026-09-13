import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:5000");

function App() {

    const [username, setUsername] = useState("");
    const [joined, setJoined] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [lastSeen, setLastSeen] = useState({});

    useEffect(() => {

        // Receive previous messages
        socket.on("messageHistory", (data) => {

            const sortedMessages = [...data].sort(
                (a, b) =>
                    new Date(a.timestamp) -
                    new Date(b.timestamp)
            );

            setMessages(sortedMessages);
        });

        // Receive new message
        socket.on("receiveMessage", (data) => {

            setMessages((previous) => {

                const updated = [...previous, data];

                return updated.sort(
                    (a, b) =>
                        new Date(a.timestamp) -
                        new Date(b.timestamp)
                );
            });
        });

        // Receive last seen
        socket.on("userLastSeen", (data) => {

            setLastSeen((previous) => ({
                ...previous,
                [data.username]: data.lastSeen
            }));
        });

        return () => {
            socket.off("messageHistory");
            socket.off("receiveMessage");
            socket.off("userLastSeen");
        };

    }, []);

    const joinChat = () => {

        if (username.trim() === "") {
            alert("Please enter your username");
            return;
        }

        socket.emit("join", username);

        setJoined(true);
    };

    const sendMessage = () => {

        if (message.trim() === "") {
            return;
        }

        socket.emit("sendMessage", {
            username: username,
            message: message
        });

        setMessage("");
    };

    const formatTime = (timestamp) => {

        return new Date(timestamp).toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );
    };

    const formatLastSeen = (timestamp) => {

        return new Date(timestamp).toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );
    };

    return (
        <div className="app">

            {!joined ? (

                <div className="join-screen">

                    <div className="join-card">

                        <h1>💬 Chat Application</h1>

                        <p>
                            Join the chat to send messages
                        </p>

                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    joinChat();
                                }
                            }}
                        />

                        <button onClick={joinChat}>
                            Join Chat
                        </button>

                    </div>

                </div>

            ) : (

                <div className="chat-container">

                    <header>

                        <div>
                            <h1>💬 Real-Time Chat</h1>
                            <p>
                                Logged in as{" "}
                                <strong>{username}</strong>
                            </p>
                        </div>

                    </header>

                    <div className="chat-area">

                        {messages.length === 0 ? (

                            <div className="empty">
                                No messages yet. Start chatting!
                            </div>

                        ) : (

                            messages.map((item) => (

                                <div
                                    className={
                                        item.username === username
                                            ? "message own"
                                            : "message"
                                    }
                                    key={item.id}
                                >

                                    <div className="message-header">

                                        <strong>
                                            {item.username}
                                        </strong>

                                        <span>
                                            {formatTime(
                                                item.timestamp
                                            )}
                                        </span>

                                    </div>

                                    <p>
                                        {item.message}
                                    </p>

                                </div>

                            ))

                        )}

                    </div>

                    <div className="input-area">

                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                        />

                        <button onClick={sendMessage}>
                            Send
                        </button>

                    </div>

                    {Object.keys(lastSeen).length > 0 && (

                        <div className="last-seen">

                            <strong>Last Seen</strong>

                            {Object.entries(lastSeen).map(
                                ([user, time]) => (

                                    <p key={user}>
                                        {user} was last seen at{" "}
                                        {formatLastSeen(time)}
                                    </p>

                                )
                            )}

                        </div>

                    )}

                </div>

            )}

        </div>
    );
}

export default App;