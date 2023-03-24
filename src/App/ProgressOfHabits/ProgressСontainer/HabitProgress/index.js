import { memo, useMemo } from 'react';
import createCalendar from '../createCalendar';
import Item from './Item';

import './style.scss';
function HabitProgress({ item }) {

    function calc(array) {
        let last = new Date(Date.now()).setHours(0, 0, 0, 0)
        let count = array.find(i => i == last) ? 0 : 1
        for (const day of array.sort((a, b) => b - a)) {
            if (last - day > 86400000) {//1000*60*60*24
                break
            } else count++
            last = day
        }
        return count
    }

    let count = useMemo(() => calc(item.progres), [item.progres.length])
    return (
        <div className='HabitProgress'>
            {createCalendar(item.id).map((dateCopy, i, arr) =>
                <Item key={i}
                    dateCopy={dateCopy}
                    isBorder={i == arr.lengt || arr.length - i <= count}
                    color={item.color}
                    title={item.title}
                    isActive={item.progres.find((el) => el == +dateCopy)}
                />
            )}
        </div>
    );
}

export default memo(HabitProgress);
