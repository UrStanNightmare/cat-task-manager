import React from 'react';
import Dayz from "dayz";
import "dayz/dist/dayz.css";
import "../styles/styles.css"
import {useDispatch, useSelector} from "react-redux";
import {setModalWindowDate, setModalWindowVisible, setVisibleEventsArray} from "../redux/actions";
import moment from "moment";

const Calendar = () => {

    const dispatch = useDispatch()
    const date = useSelector(state => state.dateRed.date)
    const events = useSelector(state => state.evRed.events)

    const dayPressedHandler = {
        onClick(event, data) {
            const start = data.toDate().toDateString()

            const d = data.toDate()

            const ev = events.events.filter(v => v.attributes.range.start.toDate().toDateString() === start)
            dispatch(setVisibleEventsArray(ev))
            dispatch(setModalWindowDate(moment([d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0])))

            dispatch(setModalWindowVisible(true))
        },
    }

    function onEventClick(event, layout) {

        const start = layout.attributes.range.start;
        const d = start.toDate()

        const ev = events.events
            .filter(v => v.attributes.range.start.toDate().toDateString() === d.toDateString())

        dispatch(setVisibleEventsArray(ev))

        dispatch(setModalWindowDate(moment([d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0])))

        dispatch(setModalWindowVisible(true))
    }

    function getEventIndex(key) {
        return events.events.findIndex(p => p.key === key)
    }

    return (
        <Dayz
            display='month'
            date={date}
            events={events}
            locale='ru'
            weekStartsOn={1}
            dayEventHandlers={dayPressedHandler}
            onEventClick={onEventClick}
            highlightDays={[Date.now()]}
        />
    );
};

export default Calendar;