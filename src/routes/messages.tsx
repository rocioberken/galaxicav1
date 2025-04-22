import { useState } from "react";

export const Messages = () => {
    const [messages] = useState([]);
    const [isLoading] = useState(false);

    if (isLoading) {
        return <div className="loading">Loading messages...</div>;
    }

    if (messages.length === 0) {
        return <div className="empty">
            
            
            <img src="../../public/messages_background.png" alt="" />
            <h3> No new messages</h3>
            <p>There’s currently no new messages  </p>
            </div>;
    }

    return (
        <div>
            <h1>Messages </h1>
         </div>
    );
};

