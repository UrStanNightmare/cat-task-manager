import React, {useMemo, useState} from 'react';
import {useSelector} from "react-redux";
import cl from "./DayFrame.module.css";
import ModalDateHeader from "./component/ModalDateHeader";
import EventsList from "./component/event/EventsList";
import AddEventButton from "./component/AddEventButton";
import CloseModalButton from "./component/CloseModalButton";

const DayFrame = () => {
    const date = useSelector(state => state.modalRed.modalWindowDate)
    const events = useSelector(state => state.evRed.events)

    const getCurrentDateEventsIds = (date) => {
        if (date.length === 0){
            return []
        }

        return events.filter(e => e.start.getTime() === date.getTime()).map(e => e.id)
    }

    const cachedEventsIds = useMemo(() => getCurrentDateEventsIds(date), [date, events])

    const [isAdding, setAdding] = useState(false)

    return (
        <div className={cl.root}>
            <ModalDateHeader/>
            <EventsList eventsIds={cachedEventsIds}/>
            <div className={cl.buttons}>
                <AddEventButton
                    isAdding={isAdding}
                    setAdding={setAdding}
                />
                <CloseModalButton setAdding={setAdding}/>
            </div>
        </div>
    );
};

export default DayFrame;