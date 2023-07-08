import React, {useState} from 'react';
import {createPortal} from "react-dom";
import {modalElement} from "../../../index";
import cl from './Modal.module.css'

const Modal = ({visible, changeVisibility, children}) => {

    const [animation, setAnimation] = useState(cl.open)
    const resetAnimation = () => {
        setAnimation(cl.open)
    }
    const bgClick = async () => {

        setAnimation(cl.closed)

        await new Promise(r => setTimeout(r, 140))
        changeVisibility(false, resetAnimation)

    }

    return (
        createPortal(
            visible && (
                <>
                    <div className={[cl.darkBG, animation].join(' ')}
                         onClick={() => bgClick()}
                    >
                    </div>
                    <div className={[cl.centered, animation].join(' ')}>
                        <div className={cl.modal}>
                            {children}
                        </div>
                    </div>
                </>
            ),
            modalElement
        )
    );
};

export default Modal;