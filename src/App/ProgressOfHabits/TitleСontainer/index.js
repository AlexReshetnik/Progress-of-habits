

import { useSelector } from 'react-redux';
import './style.scss';
function TitleСontainer({  view }) {
    const data = useSelector(state => state.data.data)
    return (
        <div className='TitleСontainer' style={{ paddingTop: view.height }}>
            {data.map((i, index) => {
                return <div style={{ height: view.height}}key={index}>
                    {i.title}
                    </div>
            })}
        </div>
    );
}

export default TitleСontainer;
