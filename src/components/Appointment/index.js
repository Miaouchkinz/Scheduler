import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import { useVisualMode } from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer: interviewer.id
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  const onDelete = () => {
    transition(CONFIRM);
  }

  const onConfirm = (interview) => {

    transition(DELETING, true);
    props.cancelInterview(props.id, props.interview)
      .then(() => onComplete())
      .catch(error => transition(ERROR_DELETE, true));
  }

  const onComplete = () => {
    transition(EMPTY)
  }

  const onEdit = () => {
    transition(EDIT);
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
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
      {mode === ERROR_SAVE && 
        <Error
        message={"Could not save appointment."}
        onClose={() => back()}
        />}
      {mode === ERROR_DELETE && 
        <Error
        message={"Could not delete appointment."}
        onClose={() => back()}
        />}
      {mode === DELETING && <Status/>}
    </article>
  );
};