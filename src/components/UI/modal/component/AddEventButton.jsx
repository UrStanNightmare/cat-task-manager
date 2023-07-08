import React, {useEffect, useState} from 'react';
import cl from "./AddEventButton.module.css"
import EventService from "../../../API/EventService";
import {useDispatch, useSelector} from "react-redux";
import {updateEvents} from "../../content/component/CustomCalendar";

const AddEventButton = ({isAdding, setAdding}) => {
    const [inputText, setInputText] = useState('')

    const dispatch = useDispatch()
    const date = useSelector(state => state.modalRed.modalWindowDate)

    useEffect(()=> {
        if (!isAdding){
            setInputText('')
        }
    }, [isAdding])

    function addButtonClick() {
        setAdding(true)
    }
    function inputChanged(event){
        event.preventDefault()
        setInputText(event.target.value)
    }
    function addEventKeyDown(event) {
        if (event.key === 'Enter') {
            EventService.addEvent(date, inputText)
                .then(r => updateEvents(date, dispatch))

            setInputText('')
            setAdding(false)
        }
    }

    return (
        isAdding
            ?
            (
                <form style={{display:"flex"}}>
                    <input
                        className={cl.input}
                        type="text"
                        placeholder="Новое событие"
                        value={inputText}
                        onChange={inputChanged}
                        onKeyDown={addEventKeyDown}
                    />
                </form>
            )
            :
            (
                <div
                    onClick={addButtonClick}
                    className={cl.label}>
                    Добавить
                </div>
            )
    );
};

export default AddEventButton;