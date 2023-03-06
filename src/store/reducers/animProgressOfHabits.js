
const SHOW = "SHOW"
const HIDE = "HIDE"

let defaultState = {
    mode: HIDE
}

export const animProgressOfHabits = (state = defaultState, action) => {
    let target = document.querySelector('.ProgressOfHabitscontainer')
    switch (action.type) {
        case HIDE:
            target.classList.add('hide')
            target.classList.remove('show')

            return { ...state, mode: HIDE }
        case SHOW:
            target.classList.add('show')
            target.classList.remove('hide')
            return { ...state, mode: SHOW }

        default:
            return state
    }
}