import React from 'react';
import cl from "./HeaderFrame.module.css"
import ConnectionFrame from "./ConnectionFrame";
import UserFrame from "./UserFrame";

const HeaderFrame = () => {

    return (
        <div className={cl.header}>
            <ConnectionFrame/>
            <UserFrame/>
        </div>
    );
};

export default HeaderFrame;