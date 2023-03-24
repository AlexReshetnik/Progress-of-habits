

import { memo } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
function TitleСontainer({ data }) {
    const { height } = useSelector(state => state.view)

    return (
        <div className='TitleСontainer' style={{ paddingTop: height }}>
            {data.map((i, index) => {
                return <div style={{ height: height }} key={index}>
                    {i.title}
                </div>
            })}
        </div>
    );
}

export default memo(TitleСontainer, (prev, next) => prev.data.length == next.data.length);
