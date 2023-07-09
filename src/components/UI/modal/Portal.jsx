import {createPortal} from "react-dom";
import {modalElement} from "../../../index";

export const Portal = ({children})=>{
    return createPortal(children, modalElement)
}