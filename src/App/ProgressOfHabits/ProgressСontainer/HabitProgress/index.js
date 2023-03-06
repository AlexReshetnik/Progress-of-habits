
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import createCalendar from '../createCalendar';
import './style.scss';
function HabitProgress({ item, view }) {
    const dispatch = useDispatch()
    const strictMode = useSelector(state => state.strictMode.mode)


    function onDoubleClickHandler(e) {

        let target = e.target.localName == "img" ? e.target.parentElement : e.target
        let day = new Date(+target.getAttribute('day')).setHours(0, 0, 0, 0)

        if (strictMode === "strictModeTRUE") {
            if (day !== new Date(Date.now()).setHours(0, 0, 0, 0)) return
        }

        let activeItem = item.progres.find((el) => {
            console.log(el + "  -  " + +target.getAttribute('day'))
            return el == +target.getAttribute('day')
        })

        if (!activeItem) {
            dispatch({ type: "DONEHABIT", day: day, title: item.title })
        } else {
            dispatch({ type: "NOTDONEHABIT", day: day, title: item.title })
        }
    }
    function calendar(start) {
        return createCalendar(start).map((dateCopy, i) => {

            let activeItem = item.progres.find((el) => (
                new Date(el).setHours(0, 0, 0, 0) === dateCopy.setHours(0, 0, 0, 0))
            )

            return (< div key={i} className="item" style={{
                height: view.height,
                width: view.width,
                marginLeft: dateCopy.getDay() == 1 && view.marginLeft
            }}
            >
                <div className="square"
                    style={{


                        border: `2.5px solid ${item.color}`
                    }}
                    onDoubleClick={onDoubleClickHandler}
                    day={+dateCopy}
                >
                    {activeItem ? (<img src="check.png" alt="" width={23} />) : undefined}

                </div>
            </div >)

        })
    }


    return (
        <div className='HabitProgress'>
            {calendar(item.id)}
        </div>

    );
}

export default HabitProgress;
