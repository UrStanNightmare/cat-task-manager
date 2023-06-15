import React, {useEffect, useState} from 'react';
import EventService from "../API/EventService";
import cl from "./AddEventButton.module.css"
import {useDispatch, useSelector} from "react-redux";

const AddEventButton = (props) => {
    const [inputText, setInputText] = useState('')

    const dispatch = useDispatch()
    const modalDate = useSelector(state => state.modalRed.date)
    const date = useSelector(state => state.dateRed.date)

    useEffect(()=> {
        if (!props.isAdding){
            setInputText('')
        }
    }, [props.isAdding])

    function addButtonClick() {
        props.setAdding(true)
    }
    function inputChanged(event){
        event.preventDefault()
        setInputText(event.target.value)
    }
    function addEventKeyDown(event) {
        if (event.key === 'Enter') {
            setInputText('')
            props.setAdding(false)

            EventService.addEvent(modalDate, event.target.value)
                .then(() => {
                    EventService.updateEvents(date, dispatch)
                });

        }
    }

    return (
        props.isAdding
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
                    +
                </div>
            )
    );
};

export default AddEventButton;