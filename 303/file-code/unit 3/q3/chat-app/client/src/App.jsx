import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:5000");

function App() {

    const [username, setUsername] = useState("");
    const [joined, setJoined] = useState(false);

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const [locations, setLocations] = useState([]);

    const messagesEndRef = useRef(null);

    // Receive messages and locations
    useEffect(() => {

        socket.on("receiveMessage", (newMessage) => {

            setMessages((previousMessages) => [
                ...previousMessages,
                newMessage
            ]);

        });

        socket.on("receiveLocation", (newLocation) => {

            setLocations((previousLocations) => [
                ...previousLocations,
                newLocation
            ]);

        });

        return () => {

            socket.off("receiveMessage");
            socket.off("receiveLocation");

        };

    }, []);

    // Load previous data
    useEffect(() => {

        if (!joined) return;

        fetch("http://localhost:5000/messages")
            .then((response) => response.json())
            .then((data) => {
                setMessages(data);
            })
            .catch((error) => {
                console.error("Error loading messages:", error);
            });

        fetch("http://localhost:5000/locations")
            .then((response) => response.json())
            .then((data) => {
                setLocations(data);
            })
            .catch((error) => {
                console.error("Error loading locations:", error);
            });

    }, [joined]);

    // Auto scroll
    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages, locations]);

    // Join Chat
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

    // Send Message
    const sendMessage = () => {

        const text = message.trim();

        if (!text) return;

        socket.emit("sendMessage", {
            username,
            message: text
        });

        setMessage("");

    };

    // Send Location
    const sendLocation = () => {

        if (!navigator.geolocation) {

            alert("Geolocation is not supported by your browser.");

            return;

        }

        navigator.geolocation.getCurrentPosition(

            (position) => {

                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                socket.emit("sendLocation", {
                    username,
                    lat,
                    lng
                });

            },

            (error) => {

                alert("Unable to get your location.");

                console.error(error);

            }

        );

    };

    // Enter key
    const handleKeyDown = (event) => {

        if (event.key === "Enter") {

            sendMessage();

        }

    };

    // Google Maps Link
    const getMapLink = (lat, lng) => {

        return `https://www.google.com/maps?q=${lat},${lng}`;

    };

    return (

        <div className="app">

            {!joined ? (

                <div className="join-screen">

                    <div className="join-card">

                        <div className="logo-circle">
                            📍
                        </div>

                        <h1>Location Chat</h1>

                        <p>
                            Chat and share your location in real time
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

                        <button
                            className="join-button"
                            onClick={joinChat}
                        >
                            Join Chat →
                        </button>

                        <div className="live-info">
                            🟢 Live • Real-time location sharing
                        </div>

                    </div>

                </div>

            ) : (

                <div className="chat-wrapper">

                    {/* Header */}

                    <header className="chat-header">

                        <div className="header-left">

                            <div className="header-logo">
                                📍
                            </div>

                            <div>

                                <h2>Location Chat</h2>

                                <div className="online-status">
                                    <span className="online-dot"></span>
                                    Live • Connected
                                </div>

                            </div>

                        </div>

                        <div className="user-badge">

                            <div className="user-avatar">
                                {username.charAt(0).toUpperCase()}
                            </div>

                            <div>

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

                        {messages.length === 0 &&
                        locations.length === 0 ? (

                            <div className="empty-chat">

                                <div className="empty-icon">
                                    💬
                                </div>

                                <h3>No messages yet</h3>

                                <p>
                                    Start chatting or share your location!
                                </p>

                            </div>

                        ) : (

                            <div className="messages-list">

                                {messages.map((msg, index) => (

                                    <div
                                        className={
                                            msg.username === username
                                                ? "message-row mine"
                                                : "message-row other"
                                        }
                                        key={msg._id || index}
                                    >

                                        <div className="message-content">

                                            <div className="message-meta">

                                                <span className="message-username">

                                                    {msg.username === username
                                                        ? "You"
                                                        : msg.username}

                                                </span>

                                                {msg.createdAt && (

                                                    <span className="message-time">

                                                        {new Date(
                                                            msg.createdAt
                                                        ).toLocaleTimeString(
                                                            [],
                                                            {
                                                                hour: "2-digit",
                                                                minute: "2-digit"
                                                            }
                                                        )}

                                                    </span>

                                                )}

                                            </div>

                                            <div className="message-bubble">

                                                {msg.message}

                                            </div>

                                        </div>

                                    </div>

                                ))}

                                {/* Locations */}

                                {locations.map((location, index) => (

                                    <div
                                        className="location-message"
                                        key={location._id || `location-${index}`}
                                    >

                                        <div className="location-icon">
                                            📍
                                        </div>

                                        <div className="location-content">

                                            <strong>
                                                {location.username}
                                            </strong>

                                            <p>
                                                Shared their location
                                            </p>

                                            <a
                                                href={getMapLink(
                                                    location.lat,
                                                    location.lng
                                                )}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                📍 Open in Google Maps
                                            </a>

                                        </div>

                                    </div>

                                ))}

                                <div ref={messagesEndRef}></div>

                            </div>

                        )}

                    </main>

                    {/* Input */}

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
                                className="location-button"
                                onClick={sendLocation}
                                title="Share your current location"
                            >
                                📍
                            </button>

                            <button
                                className="send-button"
                                onClick={sendMessage}
                                disabled={!message.trim()}
                            >
                                Send ➤
                            </button>

                        </div>

                        <div className="footer-text">
                            Press <b>Enter</b> to send •
                            Click 📍 to share your location
                        </div>

                    </footer>

                </div>

            )}

        </div>

    );

}

export default App;