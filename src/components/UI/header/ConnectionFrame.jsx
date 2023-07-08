import React from 'react';
import cl from "./ConnectionFrame.module.css";
import ConnectionImage from "./ConnectionImage";

const ConnectionFrame = () => {
    return (
        <div className={cl.connectionFrame}>
            Connection:
            <ConnectionImage/>
        </div>
    );
};

export default ConnectionFrame;