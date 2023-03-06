import TitleСontainer from './TitleСontainer';
import ProgressСontainer from './ProgressСontainer';
import './style.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
function ProgressOfHabits() {

    const dispatch = useDispatch()
    const animProgressOfHabits = useSelector(state => state.animProgressOfHabits)

    let [width, height, marginLeft] = ["40px", "40px", "40px"]
    function onScrollHandler(e) {
        let { mode } = animProgressOfHabits

        if (window.scrollY > 50) {
            if (mode != "SHOW") {
                dispatch({ type: "SHOW" })
            }
        }
        else {

            if (mode != "HIDE") {
                dispatch({ type: "HIDE" })
            }
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', onScrollHandler)
        return () => {
            window.removeEventListener('scroll', onScrollHandler)
        }
    })
 
    return (
        <div className='ProgressOfHabits'>
            <div className='ProgressOfHabitscontainer '>

          
            <TitleСontainer view={{ width, height, marginLeft }}>

            </TitleСontainer>

            <ProgressСontainer view={{ width, height, marginLeft }}>

            </ProgressСontainer>
        </div>
        </div >

    );
}

export default ProgressOfHabits;
