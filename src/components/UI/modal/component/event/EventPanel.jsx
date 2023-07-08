import React from 'react';
import cl from "./EventPanel.module.css"
import {useSelector} from "react-redux";
import ChangeStatusButton from "./ChangeStatusButton";
import DeleteEventButton from "./DeleteEventButton";

const EventPanel = ({id}) => {
    const events = useSelector(state => state.evRed.events)
    const event = events.find(e => e.id === id)

    return (
        <div className={cl.panel}>
            {event.description}
            <div className={cl.buttonPanel}>
                <ChangeStatusButton id={id}/>
                <DeleteEventButton id={id}/>
            </div>
        </div>
    );
};

export default EventPanel;