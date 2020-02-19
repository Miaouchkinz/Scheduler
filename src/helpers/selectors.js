export function getAppointmentsForDay(state, selectedDay) {
  const dayObject = state.daysList.find(dayList =>  dayList.name === selectedDay )
  const result = dayObject ? dayObject.appointments.map(appointment => state.appointments[appointment]) : [];
  
  return result;
};

export function getInterview(state, selectedInterview) {
  return selectedInterview ? 
    {...selectedInterview, interviewer: state.interviewers[selectedInterview.interviewer]}
    : null;
};

export function getInterviewersForDay(state, selectedDay) {
  const dayObject = state.daysList.find(dayList =>  dayList.name === selectedDay )
  const result = dayObject ? dayObject.interviewers.map(interviewer => state.interviewers[interviewer]) : [];
  
  return result;
};