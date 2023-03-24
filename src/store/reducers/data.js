
const DELETEHABIT = "DELETEHABIT"
const CHANGECOLOR = "CHANGECOLOR"
const CREATEHABIT = "CREATEHABIT"
const DONEHABIT = "DONEHABIT"
const NOTDONEHABIT = "NOTDONEHABIT"


let defdata = [
    {
        id: Date.now() - 60 * 60 * 60 * 24 * 30 * 30 + 50,
        title: "Sports",
        progres: [
            +new Date("2023-02-20").setHours(0, 0, 0, 0),
            +new Date("2023-02-21").setHours(0, 0, 0, 0),
            +new Date("2023-02-23").setHours(0, 0, 0, 0),
            +new Date("2023-02-18").setHours(0, 0, 0, 0),
            +new Date("2023-01-12").setHours(0, 0, 0, 0),


        ],
        color: "orange"
    }, {
        id: Date.now(),
        title: "Learn English",
        progres: [
            +new Date("2022-02-20").setHours(0, 0, 0, 0),
            +new Date("2023-02-21").setHours(0, 0, 0, 0),
            +new Date("2023-02-23").setHours(0, 0, 0, 0),
            +new Date("2023-02-18").setHours(0, 0, 0, 0),
            +new Date("2023-01-12").setHours(0, 0, 0, 0),


        ],
        color: "red"
    }, {
        id: Date.now() - 60 * 60 * 60 * 24 * 30 * 30,
        title: "Reading",
        progres: [
            +new Date("2023-02-20").setHours(0, 0, 0, 0),
            +new Date("2023-02-21").setHours(0, 0, 0, 0),
            +new Date("2023-02-23").setHours(0, 0, 0, 0),
            +new Date("2023-02-18").setHours(0, 0, 0, 0),
            +new Date("2023-01-12").setHours(0, 0, 0, 0),


        ],
        color: "green"
    }
    , {
        id: new Date("2020-02-20").setHours(0, 0, 0, 0),
        title: "Coding",
        progres: [
            +new Date("2023-02-20").setHours(0, 0, 0, 0),
            +new Date("2023-02-21").setHours(0, 0, 0, 0),
            +new Date("2023-02-23").setHours(0, 0, 0, 0),
            +new Date("2023-02-18").setHours(0, 0, 0, 0),
            +new Date("2023-01-12").setHours(0, 0, 0, 0),
        ],
        color: "green"
    }
]
let defaultState = {}
let lc_date = localStorage.getItem("data")

defaultState.data = lc_date ? JSON.parse(lc_date) : defdata


const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {

        await navigator.serviceWorker.register("/serviceWorker.js", { scope: "/", })

        const messageChannel = new MessageChannel();
        navigator.serviceWorker.controller.postMessage({
            type: 'INIT_PORT',
        }, [messageChannel.port2]);


        messageChannel.port1.onmessage = (event) => {

            console.log(event);
        };
    }
};

let sentMessage = (currentData) => {
    navigator.serviceWorker.controller.postMessage({
        type: 'SEND_DATA',
        data: JSON.stringify(currentData)
    });
}

registerServiceWorker()

export const data = (state = defaultState, action) => {
    let currentState
    switch (action.type) {

        case DELETEHABIT:
            state.data = state.data.filter(i => i.title != action.target)
            break

        case CHANGECOLOR: {
            let index = state.data.findIndex(i => i.title == action.target)
            state.data[index] = {
                ...state.data[index],
                color: action.newColor
            }
        } break

        case CREATEHABIT:
            state.data.push({
                id: Date.now(),
                title: action.name,
                progres: [],
                color: action.color
            })
            break

        case DONEHABIT: {
            let index = state.data.findIndex(i => i.title == action.title)
            state.data[index] = {
                ...state.data[index],
                progres: [...state.data[index].progres, action.day]
            }    
        }break

        case NOTDONEHABIT: {
            let index = state.data.findIndex(i => i.title == action.title)
            state.data[index] = {
                ...state.data[index],
                progres: [...state.data[index].progres.filter(l => l != action.day)]
            }
        }break
    }
    state.data = state.data.slice()
    currentState = { ...state, mode: action.type }

    localStorage.setItem("data", JSON.stringify(state.data))
    sentMessage(state.data)
    return currentState
}