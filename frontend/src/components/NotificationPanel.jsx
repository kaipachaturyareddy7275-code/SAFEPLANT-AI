import { useEffect, useState } from "react";
import "../styles/notifications.css";

function NotificationPanel() {

    const [notifications, setNotifications] = useState([]);

    const loadNotifications = () => {

        fetch(`${import.meta.env.VITE_API_URL}/notifications`)
            .then(res => res.json())
            .then(data => setNotifications(data))
            .catch(() => {});

    };

    useEffect(() => {

        loadNotifications();

        const timer = setInterval(loadNotifications, 3000);

        return () => clearInterval(timer);

    }, []);

    const clearNotifications = () => {
        setNotifications([]);
    };

    return (

        <div className="notification-panel">

            <div className="notification-header">

                <h2>
                    Notifications
                    <span className="count">
                        {notifications.length}
                    </span>
                </h2>

                <button onClick={clearNotifications}>
                    Clear All
                </button>

            </div>

            <div className="notification-list">

                {notifications.length === 0 && (
                    <p>No notifications</p>
                )}

                {notifications.map((item, index) => (

                    <div
                        key={index}
                        className={`notification ${item.level.toLowerCase()}`}
                    >

                        <strong>{item.level}</strong>

                        <p>{item.message}</p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default NotificationPanel;