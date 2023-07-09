import React, {useEffect, useMemo} from 'react';
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import {useDispatch, useSelector} from "react-redux";
import ru from "date-fns/locale/ru";
import {format, getDay, parse, startOfWeek} from "date-fns";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {setActiveDate} from "../../../../redux/reducer/dateReducer";
import {setModalWindowDate, setModalWindowVisible} from "../../../../redux/reducer/modalReducer";
import EventService from "../../../API/EventService";
import {setEventsArray} from "../../../../redux/reducer/eventReducer";

const locales = {
    'ru': ru
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

const messages = {
    today: 'Сегодня',
    previous: 'Месяц назад',
    next: 'Месяц вперед'
}
export const updateEvents = (date, dispatch) => {
    return new Promise(()=> {
        EventService.getEventsFromServer(date)
            .then(r => dispatch(setEventsArray(r)))
    })
}
const CustomCalendar = () => {
    const dispatch = useDispatch()
    const events = useSelector(state => state.evRed.events)
    const date = useSelector(state => state.dateRed.date)

    useEffect(() => {
            updateEvents(date, dispatch)
        },
        [,date])

    const onNavigate = (newDate) => {
        dispatch(setActiveDate(newDate))
    }

    const onSelectSlot = (slotInfo) => {
        // if (slotInfo.action === 'select') {
        //     return
        // }
        dispatch(setModalWindowDate(slotInfo.start))
        dispatch(setModalWindowVisible(true, null))


    }

    const onSelectEvent = (event) => {
        dispatch(setModalWindowDate(event.start))
        dispatch(setModalWindowVisible(true, null))
    }

    const {views} = useMemo(
        () => ({
            views: {
                month: true
            }
        }),
        []
    )

    return (
        <Calendar
            date={date}
            localizer={localizer}
            culture="ru"
            events={events}
            allDayAccessor="allDay"
            startAccessor="start"
            endAccessor="end"
            titleAccessor="description"
            drilldownView={null}
            views={views}
            messages={messages}
            onNavigate={onNavigate}
            selectable={true}
            onSelectSlot={onSelectSlot}
            onSelectEvent={onSelectEvent}
            popup={false}
            showAllEvents={true}
            longPressThreshold={200}
        />
    );
};

export default CustomCalendar;