import React from "react";
import classnames from "classnames/bind";
import "components/DayListItem.scss";

export default function DayListItem({ selected, spot, setDay, name, spots}) {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spot === 0
  });

  const formatSpots = (spots) => {
    if (spots === 0) return "no spots remaining"
    else if (spots === 1) return "1 spot remaining"
    else return `${spots} spots remaining`;
  };

  return (
    <li 
      className={dayClass}
      selected={selected}
      onClick={setDay}
      data-testid="day"
    > 
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
};