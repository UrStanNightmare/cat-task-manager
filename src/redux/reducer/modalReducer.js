const defaultState = {
    visible: false,
    modalWindowDate: undefined
}

export const modalReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_MODAL_WINDOW_VISIBLE:
        {
            if(action.refreshAnimationFunc != null){
                action.refreshAnimationFunc()
            }
            return {...state, visible: action.value}
        }

        case SET_MODAL_WINDOW_DATE:
            return {...state, modalWindowDate: action.value}

        default:
            return state
    }
}

const SET_MODAL_WINDOW_VISIBLE = "SET_MODAL_WINDOW_VISIBLE"
export const setModalWindowVisible = (val, refreshAnimationFunc) => {
    return {
        type: SET_MODAL_WINDOW_VISIBLE,
        value: val,
        refreshAnimationFunc: refreshAnimationFunc
    }
}

const SET_MODAL_WINDOW_DATE = "SET_MODAL_WINDOW_DATE"

export const setModalWindowDate = (val) => {
    return{
        type: SET_MODAL_WINDOW_DATE,
        value: val
    }
}