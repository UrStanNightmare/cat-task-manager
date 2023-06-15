import React from 'react';
import cl from "../DayInfoModal.module.css";
import EventService from "../API/EventService";
import {useDispatch, useSelector} from "react-redux";

const EventDoneCheckbox = ({e, ...props}) => {

    const dispatch = useDispatch()
    const date = useSelector(state => state.dateRed.date)

    async function onClick() {
        await EventService.changeEventStatus(e).then(() => {
            EventService.updateEvents(date, dispatch)
        });
    }

    return (
        <input
            className={cl.eventDoneCheckbox}
            type="checkbox"
            onClick={onClick}
            checked={props.checked}
            readOnly
        />
    );
};

export default EventDoneCheckbox;