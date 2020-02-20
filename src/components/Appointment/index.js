import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm";
import { useVisualMode } from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  }

  const onDelete = () => {
    transition(CONFIRM);
  }

  const onConfirm = (interview) => {

    transition(DELETING);
    props.cancelInterview(props.id, props.interview)
      .then(() => onComplete());
  }

  const onComplete = () => {
    transition(EMPTY)
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status/>}
      {mode === CONFIRM && 
        <Confirm
          onCancel={() => back()}
          onConfirm={onConfirm}
          message={"Are you sure you would like to delete?"}
        />}
       {mode === DELETING && <Status/>}
    </article>
  );
};