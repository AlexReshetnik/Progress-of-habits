
const strictModeTRUE = "strictModeTRUE"
const strictModeFALSE = "strictModeFALSE"

let defaultState = {
    mode: strictModeTRUE
}

export const strictMode = (state = defaultState, action) => {

    switch (action.type) {
        case strictModeTRUE:
            return { ...state, mode: strictModeTRUE }
        case strictModeFALSE:
            return { ...state, mode: strictModeFALSE }
        default:
            return state
    }
}