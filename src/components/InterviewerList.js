import React from "react";
import InterviewerListItem from "components/InterviewerListItem"
import "components/InterviewerList.scss"
import { PropTypes } from "prop-types";

export default function InterviewerList(props) {

  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        avatar={interviewer.avatar}
        name={interviewer.name}
        selected={props.selectedInterviewer && interviewer.id === props.selectedInterviewer.id}
        setInterviewer={(event) => props.setInterviewer(interviewer)}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  );
};

InterviewerList.propTypes = {
  selectedInterviewer: PropTypes.object,
  setInterviewer: PropTypes.func.isRequired
};