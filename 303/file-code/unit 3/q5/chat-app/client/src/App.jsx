import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:5000");

function App() {
    const [username, setUsername] = useState("");
    const [joined, setJoined] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [activity, setActivity] = useState([]);

    useEffect(() => {

        socket.on("onlineUsers", (users) => {
            setOnlineUsers(users);
        });

        socket.on("userJoined", (data) => {
            setActivity((previous) => [
                ...previous,
                {
                    username: data.username,
                    action: "joined",
                    time: new Date().toLocaleTimeString()
                }
            ]);
        });

        socket.on("userLeft", (data) => {
            setActivity((previous) => [
                ...previous,
                {
                    username: data.username,
                    action: "left",
                    time: new Date().toLocaleTimeString()
                }
            ]);
        });

        return () => {
            socket.off("onlineUsers");
            socket.off("userJoined");
            socket.off("userLeft");
        };

    }, []);

    const joinApplication = () => {

        const name = username.trim();

        if (name === "") {
            alert("Please enter your username");
            return;
        }

        socket.emit("join", name);

        setUsername(name);
        setJoined(true);
    };

    return (
        <div className="app">

            {!joined ? (

                <div className="join-container">

                    <div className="join-card">

                        <div className="icon">
                            👥
                        </div>

                        <h1>Real-Time User Tracking</h1>

                        <p>
                            Enter your name to join the application
                        </p>

                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    joinApplication();
                                }
                            }}
                        />

                        <button onClick={joinApplication}>
                            Join Application
                        </button>

                    </div>

                </div>

            ) : (

                <div className="dashboard">

                    <header>

                        <div>
                            <h1>👥 User Tracking</h1>

                            <p>
                                <span className="online-dot"></span>
                                Connected • Real-time
                            </p>
                        </div>

                        <div className="current-user">
                            <div className="avatar">
                                {username.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <strong>{username}</strong>
                                <small>You</small>
                            </div>
                        </div>

                    </header>

                    <div className="content">

                        <div className="online-box">

                            <span>🟢</span>

                            <div>
                                <h2>{onlineUsers.length}</h2>
                                <p>
                                    {onlineUsers.length === 1
                                        ? "User Online"
                                        : "Users Online"}
                                </p>
                            </div>

                        </div>

                        <section>

                            <h2>Currently Online</h2>

                            <div className="users">

                                {onlineUsers.map((user) => (

                                    <div
                                        className="user"
                                        key={user.id}
                                    >

                                        <div className="user-avatar">
                                            {user.username
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div className="user-info">

                                            <strong>
                                                {user.username}
                                            </strong>

                                            <span>
                                                {user.username === username
                                                    ? "You"
                                                    : "Online"}
                                            </span>

                                        </div>

                                        <div className="status"></div>

                                    </div>

                                ))}

                            </div>

                        </section>

                        <section>

                            <h2>Recent Activity</h2>

                            <div className="activity">

                                {activity.length === 0 ? (

                                    <p className="empty">
                                        Waiting for user activity...
                                    </p>

                                ) : (

                                    activity
                                        .slice()
                                        .reverse()
                                        .slice(0, 8)
                                        .map((item, index) => (

                                            <div
                                                className="activity-item"
                                                key={index}
                                            >

                                                <span>
                                                    {item.action === "joined"
                                                        ? "🟢"
                                                        : "🔴"}
                                                </span>

                                                <div>
                                                    <strong>
                                                        {item.username}
                                                    </strong>

                                                    {item.action === "joined"
                                                        ? " joined the application"
                                                        : " left the application"}
                                                </div>

                                                <small>
                                                    {item.time}
                                                </small>

                                            </div>

                                        ))

                                )}

                            </div>

                        </section>

                    </div>

                    <footer>
                        Real-Time User Tracking • Socket.io
                    </footer>

                </div>

            )}

        </div>
    );
}

export default App;