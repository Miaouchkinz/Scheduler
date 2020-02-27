import React from "react";
import classnames from "classnames/bind";
import "components/InterviewerListItem.scss"

export default function InterviewerListItem({ selected, setInterviewer, avatar, name }) {
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  return (
    <li 
      className={interviewerClass}
      onClick={setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
};
