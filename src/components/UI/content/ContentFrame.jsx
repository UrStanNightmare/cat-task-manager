import React from 'react';
import cl from "./CalendarFrame.module.css"
import CustomCalendar from "./component/CustomCalendar";

const ContentFrame = () => {
    return (
        <div className={cl.calendar}>
           <CustomCalendar/>
        </div>
    );
};
export default ContentFrame;