
const OPEN = "OPEN"
const CLOSE = "CLOSE"

let birthdate = localStorage.getItem("birthdate")
let defaultState={}
if(birthdate){
     defaultState = {
        statePage: CLOSE,
        birthdate: birthdate
    }
}else{
     defaultState = {
        statePage: OPEN,
        birthdate: undefined
    }
}

export const startPageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case OPEN:
            return { ...state, statePage: OPEN }
        case CLOSE:
            console.log(action.birthdate);
            localStorage.setItem("birthdate", action.birthdate)

            return { ...state, statePage: CLOSE, birthdate:action.birthdate }
        default:
            return state
    }
}