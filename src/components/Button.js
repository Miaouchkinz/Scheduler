import React from "react";
import classnames from "classnames/bind";
import "components/Button.scss";

export default function Button({ confirm, danger, onClick, disabled, children}) {
   const buttonClass = classnames("button", {
      "button--confirm": confirm,
      "button--danger": danger
   });

   return ( 
      <button 
         className={buttonClass}
         onClick={onClick}
         disabled={disabled}
      >
         {children}
      </button>
   );
};
