import React from 'react';
import {CiFaceSmile} from "react-icons/ci";
import cl from "./UserFrame.module.css";

const UserFrame = () => {
    return (
        <div className={cl.userFrame}>
            Username
            <CiFaceSmile className={cl.userIcon}/>
        </div>
    );
};

export default UserFrame;