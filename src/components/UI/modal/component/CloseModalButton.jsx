import React from 'react';
import cl from "./CloseModalButton.module.css";
import {useDispatch} from "react-redux";
import {setModalWindowVisible} from "../../../../redux/reducer/modalReducer";

const CloseModalButton = ({setAdding}) => {
    const dispatch = useDispatch()

    const closeEvent = () => {
        setAdding(false)
        dispatch(setModalWindowVisible(false))
    }

    return (
        <div
            onSelect={e => e.stopPropagation()}
            onClick={closeEvent}
            className={cl.closeButton}>
            Закрыть
        </div>
    );
};

export default CloseModalButton;