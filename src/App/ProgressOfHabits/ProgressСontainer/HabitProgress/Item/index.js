import {memo, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './style.scss';
function Item({dateCopy, isBorder, color, title, isActive}) {
  const dispatch = useDispatch();
  const strictMode = useSelector(state => state.strictMode.mode);
  const {height, width, marginLeft} = useSelector(state => state.view);
  let squareRef = useRef();

  function onDoubleClickHandler(e) {
    let target = squareRef.current;

    let day = +target.getAttribute('day');

    if (
      strictMode === 'strictModeTRUE' &&
      day !== new Date(Date.now()).setHours(0, 0, 0, 0)
    )
      return;

    if (!isActive) {
      dispatch({type: 'DONEHABIT', day: day, title: title});
    } else {
      dispatch({type: 'NOTDONEHABIT', day: day, title: title});
    }
  }
  console.log('render item');
  return (
    <div
      className='item'
      style={{
        height: height,
        width: width,

        marginLeft: dateCopy.getDay() == 1 && marginLeft,
      }}>
      <div
        className='square'
        ref={squareRef}
        style={isBorder ? {border: `2.2px solid ${color}`} : {}}
        onDoubleClick={onDoubleClickHandler}
        day={+dateCopy}>
        {isActive ? <img src='check.png' draggable={false} alt='' width={23} /> : undefined}
      </div>
    </div>
  );
}

export default memo(Item, (prev, next) => {
  return (
    +prev.dateCopy == +next.dateCopy &&
    prev.isBorder == next.isBorder &&
    prev.color == next.color &&
    prev.title == next.title &&
    prev.isActive == next.isActive
  );
});
