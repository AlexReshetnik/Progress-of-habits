import Years from './Years';
import './style.scss';
import ProgressOfHabits from './ProgressOfHabits';
import ContextMenu from './ContextMenu';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


function App() {
  const stateStartPage = useSelector(state => state.startPageReducer.statePage)


  return (
    <div className="App">
      <ContextMenu></ContextMenu>
      <Years />
      {stateStartPage !== "OPEN" ? <ProgressOfHabits /> : undefined}
    </div>
  );
}

export default App;
