import React, {useMemo} from 'react';
import DateUtils from "../../../utils/dateUtils";
import {useSelector} from "react-redux";
import cl from "./ModalDateHeader.module.css"

const ModalDateHeader = () => {
    const date = useSelector(state => state.modalRed.modalWindowDate)

    const cachedDateString = useMemo(() => DateUtils.createDateString(date),
        [date])

    return (
        <h1 className={cl.header}>
            {date === undefined ? "Date error!!!" : cachedDateString}
        </h1>
    );
};

export default ModalDateHeader;