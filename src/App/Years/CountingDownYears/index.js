import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
function CountingDownYears() {
    const birthdate = localStorage.getItem("birthdate")
    const dbirthdate = new Date(birthdate + "T00:00:00.000");
    const [countYear, setCountYear] = useState(calc())
    const mode = useSelector(state => state.animProgressOfHabits.mode)
    function calc() {
        return ((Date.now() - dbirthdate) / 31557600000).toFixed(10)
    }
    useEffect(() => {
        let IntervaId = setInterval(() => {
            setCountYear(calc())
        }, 10)
        return () => {
            clearInterval(IntervaId)
        }
    }, [])

    return (
        <div className='container'>
            <div className='numbers'>
                {countYear.split('').map((item, index) => {

                    return <span className={`num  n${index + 1}`} key={index}>{item}</span>
                })}
            </div>
        </div>

    );
}

export default CountingDownYears;
