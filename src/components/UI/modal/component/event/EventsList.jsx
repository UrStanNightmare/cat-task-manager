import React from 'react';
import EventPanel from "./EventPanel";
import cl from "./EventsList.module.css"

const EventsList = ({eventsIds}) => {

    if (eventsIds.length === 0) {
        return (<div className={cl.emptyPanel}>
            Пока нет событий.
        </div>)
    }

    return (
        <div className={cl.eventsPanel}>
            {eventsIds.map(e =>
                (<EventPanel key={e} id={e}/>)
            )}
        </div>
    )
};

export default EventsList;