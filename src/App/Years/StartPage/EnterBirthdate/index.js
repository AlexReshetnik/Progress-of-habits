import {useDispatch} from "react-redux";
import "./style.scss";

function EnterBirthdate() {
  const dispatch = useDispatch();

  function onKeyUpHandler(e) {
    if (e.key === "Enter") {
      //console.log(new Date(e.target.value));
      dispatch({type: "CLOSE", birthdate: e.target.value});
    }
  }
  return <input id='enterBirthdate' onKeyUp={onKeyUpHandler} type='text' />;
}

export default EnterBirthdate;
