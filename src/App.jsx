import React, {useEffect} from 'react';
import "./styles/styles.css"
import DayInfoModal from "./components/DayInfoModal";
import Calendar from "./components/Calendar";
import {useDispatch, useSelector} from "react-redux";
import {changeDateMonth, resetDate} from "./redux/actions";
import {getMonthName} from "./components/dateUtils";
import EventService from "./components/API/EventService";


const App = () => {
    const dispatch = useDispatch()
    const date = useSelector(state => state.dateRed.date)
    const events = useSelector(state => state.evRed.events)
    const modalVisible = useSelector(state => state.modalRed.visible)

    useEffect(() => {
        EventService.updateEvents(date, dispatch)
    }, [date])

    function nextMonth() {
        dispatch(changeDateMonth(1))
    }

    function prevMonth() {
        dispatch(changeDateMonth(-1))
    }

    function resetMonth() {
        dispatch(resetDate())
    }

    return (<div className="app">
            <DayInfoModal/>
            {!modalVisible
                ?
                (<div className="contentPanel">
                    <h1>Calendar</h1>
                    <div className="monthPanel">
                        <button
                            className="monthSwitchButton"
                            onClick={prevMonth}
                        >
                            &lt;
                        </button>
                        <button
                            className="monthResetButton"
                            onClick={resetMonth}>
                            {getMonthName(date.toDate().getMonth())}
                        </button>
                        <button
                            className="monthSwitchButton"
                            onClick={nextMonth}>
                            &gt;
                        </button>
                    </div>
                    <Calendar/>
                </div>)
                : (<div/>)
            }
        </div>

    );
};

export default App;