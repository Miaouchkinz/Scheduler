import { useEffect, useReducer} from "react";
import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from "../reducers/application";
import Axios from "axios";

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    daysList: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => dispatch({type: SET_DAY, value: day});
  
  const bookInterview = (id, interview) => {
    return Axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({type: SET_INTERVIEW, value: {id, interview}})
        });
  };

  const cancelInterview = (id, interview) => {
    return Axios.delete(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({type: SET_INTERVIEW, value: {id, interview: null}})
        });
  };

  useEffect(() => {
    Promise.all([
      Axios.get(`http://localhost:8001/api/days`),
      Axios.get(`http://localhost:8001/api/appointments`),
      Axios.get(`http://localhost:8001/api/interviewers`),
    ]).then((all) => {
      dispatch({ 
        type: SET_APPLICATION_DATA, 
        value: {
          daysList: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }});
    });
  }, []);

  return {  
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};

export default useApplicationData;
