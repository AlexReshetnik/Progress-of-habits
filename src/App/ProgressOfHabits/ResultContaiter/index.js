

import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import ResultItem from './ResultItem';
import './style.scss';
function ResultContaiter() {
    const data = useSelector(state => state.data.data)
    const { height } = useSelector(state => state.view)

 

    return (
        <div className='ResultContaiter' style={{ paddingTop: height }}>
            {data.map((item, index) => {
                return <ResultItem key={index} item={item} />
            })}
        </div>
    );
}

export default ResultContaiter;
