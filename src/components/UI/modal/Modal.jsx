import React from 'react';
import cl from './Modal.module.css'
import {Portal} from "./Portal";

const Modal = ({visible, children}) => {
    return (
        <Portal>
            {visible && (
                <div className={visible ? [cl.modal, cl.modal_active].join(" ") : cl.modal}>
                    <div className={visible ? [cl.modal_content, cl.content_active].join(" ") : cl.content_active}
                         onClick={event => event.stopPropagation()}>
                        {children}
                    </div>
                </div>
            )}
        </Portal>
    );
};
export default Modal;