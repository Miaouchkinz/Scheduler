import React from "react";
import classnames from "classnames/bind";
import "components/InterviewListItem.scss"

export default function InterviewerListItem(props) {
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  })

  return (
    <li 
      className={interviewerClass}
      key={props.id}
      selected={props.selected}
      onClick={() => props.setInterviewer(props.name)}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  );
}
