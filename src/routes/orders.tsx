import { useState } from "react";

export const Orders = () => {
    const [orders] = useState([]);
    const [isLoading] = useState(false);

    if (isLoading) {
        return <div className="loading">Loading orders...</div>;
    }

    if (orders.length === 0) {
        return <div className="empty">
            
            
            <img src="../../public/orders_background.png" alt="" />
            <h3> No orders yet</h3>
            <p>There’s currently no orders placed </p>
            </div>;
    }

    return (
        <div>
            <h1>Orders </h1>
         </div>
    );
};

