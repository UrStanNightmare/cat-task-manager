import React from 'react';
import cl from './DeleteEvent.module.css'
import { AiOutlineDelete } from "react-icons/ai";
import EventService from "../../../../API/EventService";
import {updateEvents} from "../../../content/component/CustomCalendar";
import {useDispatch, useSelector} from "react-redux";

const DeleteEventButton = ({id}) => {
    const dispatch = useDispatch()
    const date = useSelector(state => state.dateRed.date)

    const closeEvent = (event) => {
        if (event.type === 'click'){
            EventService.deleteEvent(id)
                .then(r => updateEvents(date, dispatch))
        }
    }

    return (
        <AiOutlineDelete
            onSelect={e => e.stopPropagation()}
            onClick={closeEvent}
            className={cl.deleteButton}
        />
    );
};

export default DeleteEventButton;