import React from "react";
import classnames from "classnames/bind";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spot === 0
  })

  return (
    <li 
      className={dayClass}
      selected={props.selected}
      onClick={() => props.setDay(props.name)}
    > 
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}

// Create an object called dayClass that applies the day-list__item--selected
// class name if props.selected is true and the day-list__item--full
// class name if props.spots is 0.