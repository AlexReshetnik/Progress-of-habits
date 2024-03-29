import { combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { startPageReducer } from "./reducers/startPageReducer"
import { strictMode } from "./reducers/strictMode"
import { data } from "./reducers/data"
import { animProgressOfHabits } from "./reducers/animProgressOfHabits"
import { view } from "./reducers/view"

export const store = createStore(combineReducers({
    startPageReducer,
    strictMode,
    data,
    animProgressOfHabits,
    view
   
}),composeWithDevTools())
