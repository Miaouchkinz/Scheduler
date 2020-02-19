export function getAppointmentsForDay(state, selectedDay) {
  const dayObject = state.days.find(day =>  day.name === selectedDay )
  const result = dayObject ? dayObject.appointments.map(appointment => state.appointments[appointment]) : [];
  
  return result;
};