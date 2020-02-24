import React from "react";
import classnames from "classnames/bind";
import "components/DayListItem.scss";

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
      onClick={props.setDay}
    > 
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}