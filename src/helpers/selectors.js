export function getAppointmentsForDay(state, selectedDay) {
  const dayObject = state.daysList.find(dayList =>  dayList.name === selectedDay )
  const result = dayObject ? dayObject.appointments.map(appointment => state.appointments[appointment]) : [];
  
  return result;
};