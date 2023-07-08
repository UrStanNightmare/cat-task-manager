import React, {useEffect, useState} from 'react';
import cl from "./ChangeStatusButton.module.css";
import EventService from "../../../../API/EventService";
import {updateEvents} from "../../../content/component/CustomCalendar";
import {useDispatch, useSelector} from "react-redux";

const ChangeStatusButton = ({id}) => {
    const dispatch = useDispatch()
    const date = useSelector(state => state.dateRed.date)

    const events = useSelector(state => state.evRed.events)
    const event = events.find(e => e.id === id)

    const [checked, setChecked] = useState(event.isDone)
    const handleChange = () => {
        EventService.changeEventStatus(event.id)
            .then(r => updateEvents(date, dispatch))
    };

    useEffect(() => {
        setChecked(event.isDone)
    }, [events])

    return (
        <input type='checkbox'
               checked={checked}
               onChange={handleChange}
               className={cl.checkBox}
        />
    );
};

export default ChangeStatusButton;