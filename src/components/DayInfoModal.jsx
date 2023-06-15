import React, {useEffect, useMemo, useState} from 'react';
import cl from './DayInfoModal.module.css'
import EventDoneCheckbox from "./UI/EventDoneCheckbox";
import AddEventButton from "./UI/AddEventButton";
import {useDispatch, useSelector} from "react-redux";
import {getDayOfWeekName, getMonthName} from "./dateUtils";
import {setModalWindowVisible, setVisibleEventsArray} from "../redux/actions";
import RemoveEventButton from "./UI/RemoveEventButton";

const DayInfoModal = (props) => {
        const rootClasses = [cl.dayInfo]

        const dispatch = useDispatch()

        const modalVisible = useSelector(state => state.modalRed.visible)
        const modalDate = useSelector(state => state.modalRed.date)
        const events = useSelector(state => state.evRed.events)

        const visibleEventsArray = useSelector(state => state.evRed.visibleEvents)

        const showDate = useMemo(getDayDetails, [modalDate])
        const showEventsData = useMemo(generateEventElements, [visibleEventsArray])

        const [isAdding, setAdding] = useState(false)

        useEffect(() => {
            const ev = events.events
                .filter(v => v.attributes.range.start.toDate().toDateString() === modalDate.toDate().toDateString())

            dispatch(setVisibleEventsArray(ev))
        }, [events])

        function getDayDetails() {
            if (!modalVisible) {
                return
            }

            if (modalDate === undefined) {
                return "Can't find date"
            }

            const d = modalDate.toDate()

            return [getMonthName(d.getMonth()), d.getDate(), getDayOfWeekName(d)].join(', ')
        }

        function closeEvent() {
            if (isAdding) {
                setAdding(false)
                return
            }
            dispatch(setModalWindowVisible(false))
        }

        const closeButton = () => (
            <div
                onSelect={e => e.stopPropagation()}
                onClick={closeEvent}
                className={cl.closeButton}>
                Close
            </div>
        )

        function generateEventElements() {
            if (!modalVisible) {
                return;
            }

            if (visibleEventsArray === undefined) {
                return "Error with events"
            }

            if (visibleEventsArray.length === 0) {
                return (
                    <div style={{color: "#CCCCCC"}}>
                        No events yet
                    </div>
                )
            }

            return (visibleEventsArray.map(e => (
                <div
                    className={cl.eventInfo}
                    key={e.key}>
                    {e.attributes.content}
                    <div className={cl.buttonsPanel}>
                        <EventDoneCheckbox
                            checked={e.attributes.done}
                            e={e}
                        />
                        <RemoveEventButton
                            e={e}
                        />
                    </div>
                </div>

            )))
        }

        if (modalVisible) {
            rootClasses.push(cl.active)
        }

        return (
            <div className={rootClasses.join(' ')}
                 onClick={closeEvent}>
                {modalVisible
                    ?
                    <div className={cl.dayInfoContent}
                         onClick={e => e.stopPropagation()}>
                        <h1 className={cl.dayLabel}>{showDate}</h1>
                        <div className={cl.eventPanel}>
                            {showEventsData}
                            <AddEventButton
                                isAdding={isAdding}
                                setAdding={setAdding}
                            />
                            {closeButton()}
                        </div>
                    </div>
                    :
                    <></>
                }
            </div>
        );
    }
;

export default DayInfoModal;