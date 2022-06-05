import React from "react";
import style from "./Button.module.css";

const Button = ({ onClick, text, color, id }) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={
        color !== undefined
          ? color === "green"
            ? `${style.button} ${style.green}`
            : `${style.button} ${style.red}`
          : style.button
      }
    >
      {text}
    </div>
  );
};

export default Button;
