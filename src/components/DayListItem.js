import React from "react";
import classnames from "classnames/bind";
import "components/DayListItem.scss";

// Write a function called formatSpots in the DayListItem
// component that will format the props.spots to make our tests pass.

export default function DayListItem(props) {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spot === 0
  })

  const formatSpots = (spots) => {
    if (spots === 0) return "no spots remaining"
    else if (spots === 1) return "1 spot remaining"
    else return `${spots} spots remaining`;
  }

  return (
    <li 
      className={dayClass}
      selected={props.selected}
      onClick={() => props.setDay(props.name)}
    > 
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

// Create an object called dayClass that applies the day-list__item--selected
// class name if props.selected is true and the day-list__item--full
// class name if props.spots is 0.