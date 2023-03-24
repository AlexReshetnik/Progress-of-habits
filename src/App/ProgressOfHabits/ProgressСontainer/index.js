import { useSelector } from "react-redux";
import HabitHeader from "./HabitHeader";
import HabitProgress from "./HabitProgress";
import ScrollContainer from "./ScrollContainer"
import './style.scss';
function ProgressСontainer() {
    const data = useSelector(state => state.data.data)
    
    return (

        <ScrollContainer >

            <HabitHeader />

            {data.map(i => <HabitProgress key={i.id} item={i} />)}

        </ScrollContainer>
    );
}

export default ProgressСontainer;
