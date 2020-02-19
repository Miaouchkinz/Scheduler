import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import Axios from "axios";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    daysList: [],
    appointments: {},
    interviewers: {}
  })
  const setDay = day => setState({...state, day});

  useEffect(() => {
    Promise.all([
      Promise.resolve(Axios.get(`http://localhost:8001/api/days`)),
      Promise.resolve(Axios.get(`http://localhost:8001/api/appointments`)),
      Promise.resolve(Axios.get(`http://localhost:8001/api/interviewers`)),
    ]).then((all) => {
      setState(prev => ({ ...prev, daysList: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.daysList}
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

              return (
                appointment.id ?
                <Appointment {...appointment} key={appointment.id} interview={interview}/>
                : 
                <Appointment time={props.time}/>
              );

            })}
          <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}