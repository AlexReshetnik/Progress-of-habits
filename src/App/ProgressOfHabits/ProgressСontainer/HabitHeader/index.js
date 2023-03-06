
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import createCalendar from '../createCalendar';
import './style.scss';
function HabitHeader({ view }) {
    const data = useSelector(state => state.data.data)

    let startMAXHabit = Date.now()
    for (const iterator of data) {
        if (iterator.id < startMAXHabit) {
            startMAXHabit = iterator.id
        }

    }


    function calendar(start) {
        let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
        //  days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        let mons = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December']

        return createCalendar(start).map((dateCopy, i,arr) => (
            <span key={i} className="title" style={{
                width: view.width,
                height: view.height,
                marginLeft: dateCopy.getDay() == 1 && view.marginLeft,
                color: (i + 1 == arr.length) ? "red" : undefined,
                fontSize: (i + 1 == arr.length) ? " 1.35em" : "1em"
            }}>

                <div className='day'>
                    {days[dateCopy.getDay()]}
                </div>

                <div className='number'>
                    {dateCopy.getDate()}
                </div>

                {dateCopy.getDate() == 1 ? (
                    <div className='month'>
                        {mons[dateCopy.getMonth()]}
                    </div>)
                    : null}
            </span >
        ))
    }
    return (
        <div className='HabitHeader'>
            {calendar(new Date(startMAXHabit - 1000 * 60 * 60 * 24 * 15))}
        </div>
    );
}

export default HabitHeader;
