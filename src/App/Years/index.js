import { useDispatch, useSelector } from 'react-redux';
import CountingDownYears from './CountingDownYears';
import StartPage from './StartPage';
import './style.scss';
function Years() {
    const dispatch = useDispatch()
    const stateStartPage = useSelector(state => state.startPageReducer.statePage)

    return (
        <>
            {stateStartPage == "OPEN" ? <StartPage /> : <CountingDownYears />}
        </>

    );
}

export default Years;
