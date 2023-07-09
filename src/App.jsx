import React, {useEffect} from 'react';
import ContentFrame from "./components/UI/content/ContentFrame";
import HeaderFrame from "./components/UI/header/HeaderFrame";
import "./styles/styles.css"
import {useDispatch, useSelector} from "react-redux";
import {setModalWindowVisible} from "./redux/reducer/modalReducer";
import DayFrame from "./components/UI/modal/DayFrame";
import EventService from "./components/API/EventService";
import {setServerOnlineState} from "./redux/reducer/serverReducer";
import Modal from "./components/UI/modal/Modal";

const App = () => {
    const dispatch = useDispatch()
    const modalVisible = useSelector(state => state.modalRed.visible)
    const changeModalVisibility = (val, resetFunc) => {
        dispatch(setModalWindowVisible(val, resetFunc))
    }

    const INTERVAL_MS = 300000
    const updateServerAvailabilityStatus = async () => {
        const isAvailable = await EventService.isServerAvailable()
        dispatch(setServerOnlineState(isAvailable))
    }

    const setIntervalImmadiateley = (func, interval) => {
        func()
        return setInterval(func, interval)
    }

    useEffect(() => {
        const interval = setIntervalImmadiateley(updateServerAvailabilityStatus, INTERVAL_MS)

        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <div className="app">
                <HeaderFrame/>
                <ContentFrame/>
            </div>

            <Modal
                visible={modalVisible}
            >
                <DayFrame/>
            </Modal>
        </>


    )
};
export default App;