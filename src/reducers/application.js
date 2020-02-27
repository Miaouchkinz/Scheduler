export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW="SET_INTERVIEW";

const reducer = (state, action) => {
  switch(action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.value
      };
    // When the scheduler API returns our requests with the application data
    case SET_APPLICATION_DATA:
      return {
        ...state,
        daysList: action.value.daysList,
        appointments: action.value.appointments,
        interviewers: action.value.interviewers
      };
    // bookInterview and cancelInterview functions
    case SET_INTERVIEW:
      const interviewValue = action.value.interview ? action.value.interview : null;
      
      const appointment = {
        ...state.appointments[action.value.id],
        interview: interviewValue ? { ...interviewValue } : null
      };
  
      const appointments = {
        ...state.appointments,
        [action.value.id]: appointment
      };

      const getSpotsForDay = () => {
        const updatedDaysList = state.daysList.map((day) => {
          const unbooked = day.appointments.filter(app => !appointments[app].interview)
          day.spots = unbooked.length
          return day
        });
        return updatedDaysList;
      };

      return {
        ...state,
        daysList:getSpotsForDay(),
        appointments
    };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
    };
};

export default reducer;