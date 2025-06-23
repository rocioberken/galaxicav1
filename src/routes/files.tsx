import { useState } from "react";

export const Files = () => {
    const [files] = useState([]);
    const [isLoading] = useState(false);

    if (isLoading) {
        return <div className="loading">Loading files...</div>;
    }

    if (files.length === 0) {
        return <div className="empty">
            
            
            <img src="./files_background.png" alt="" />
            <h3> No files yet</h3>
            <p>There’s currently no files placed </p>
            </div>;
    }

    return (
        <div>
            <h1>files </h1>
         </div>
    );
};

