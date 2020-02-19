export function getAppointmentsForDay(state, day) {
  const selectedDay = day;
  const dayObject = state.days.find(day =>  day.name === selectedDay )
  
  const result = dayObject ? dayObject.appointments.map(appointment => state.appointments[appointment]) : [];
  
  return result;
};