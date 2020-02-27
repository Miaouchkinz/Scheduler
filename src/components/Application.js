import React from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered"/>
        <nav className="sidebar__menu">
          <DayList
            daysList={state.daysList}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
          {getAppointmentsForDay(state, state.day).map(appointment => {
            const interview = getInterview(state, appointment.interview);
            const interviewers = getInterviewersForDay(state, state.day)
            
              return (
                appointment.id ?
                <Appointment 
                  {...appointment} 
                  key={appointment.id} 
                  interview={interview} 
                  interviewers={interviewers} 
                  bookInterview={bookInterview} 
                  cancelInterview={cancelInterview}
                />
                :
                <Appointment time={props.time} interviewers={interviewers} bookInterview={bookInterview}/>
              );
            })}
          <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};