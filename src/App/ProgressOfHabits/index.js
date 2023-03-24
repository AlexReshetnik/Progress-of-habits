import TitleСontainer from './TitleСontainer';
import ProgressСontainer from './ProgressСontainer';
import './style.scss';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResultContaiter from './ResultContaiter';
function ProgressOfHabits() {

    const dispatch = useDispatch()
    const animProgressOfHabits = useSelector(state => state.animProgressOfHabits)
    const data = useSelector(state => state.data.data)
   
    function onScrollHandler(e) {
        //////

 //use callback

        //
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

          
          <TitleСontainer   data={data}>

            </TitleСontainer>

            <ProgressСontainer >

            </ProgressСontainer>

            <ResultContaiter>

            </ResultContaiter>
        </div>
        </div >

    );
}


export default ProgressOfHabits;
