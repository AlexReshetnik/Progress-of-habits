import { useSelector } from "react-redux";
import HabitHeader from "./HabitHeader";
import HabitProgress from "./HabitProgress";
import ScrollContainer from "./ScrollContainer"
import './style.scss';
function ProgressСontainer({ view }) {
    const data = useSelector(state => state.data.data)
    return (

        <ScrollContainer view={view}>

            <HabitHeader view={view}/>

            {data.map(i => <HabitProgress view={view} key={i.id} item={i} />)}

        </ScrollContainer>
    );
}

export default ProgressСontainer;
