export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const ADD_INTERVIEW = "ADD_INTERVIEW";
export const REMOVE_INTERVIEW = "REMOVE_INTERVIEW";

const reducer = (state, action) => {

  switch(action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.value
      }
    case SET_APPLICATION_DATA:
      // when our scheduler API returns our request with the application data
      return {
        ...state,
        daysList: action.value.daysList,
        appointments: action.value.appointments,
        interviewers: action.value.interviewers
      }
    case ADD_INTERVIEW:
      // bookInterview function
      const appointment = {
        ...state.appointments[action.value.id],
        interview: { ...action.value.interview }
      };
  
      const appointments = {
        ...state.appointments,
        [action.value.id]: appointment
      };

      return {
        ...state,
        appointments
    }
    case REMOVE_INTERVIEW:
      // cancelInterview function
      const deletedAppointment = {...state.appointments}
      deletedAppointment[action.value.id].interview = null;

      return {
        ...state,
        deletedAppointment
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
}

export default reducer;