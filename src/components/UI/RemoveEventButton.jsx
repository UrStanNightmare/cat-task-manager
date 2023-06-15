import React from 'react';
import cl from "../DayInfoModal.module.css";
import {useDispatch, useSelector} from "react-redux";
import EventService from "../API/EventService";

const RemoveEventButton = ({e}) => {

    const dispatch = useDispatch()
    const date = useSelector(state => state.dateRed.date)
    async function onClick() {
        await EventService.removeEvent(e).then(() => {
            EventService.updateEvents(date, dispatch)
        });
    }

    return (
        <button
            className={cl.eventRemoveButton}
            onClick={onClick}
        >
            X
        </button>
    );
};

export default RemoveEventButton;