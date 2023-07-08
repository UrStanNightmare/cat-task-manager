import React from 'react';
import {useSelector} from "react-redux";
import {CiWifiOn, CiWifiOff} from "react-icons/ci"
import cl from "./ConnectionImage.module.css"

const ConnectionImage = () => {
    const connectionState = useSelector(state => state.serRed.serverOnline)

    return (connectionState ?
            <CiWifiOn className={[cl.image, cl.connected].join(' ')}/>
            :
            <CiWifiOff className={[cl.image, cl.not_connected].join(' ')}/>
    );
};

export default ConnectionImage;