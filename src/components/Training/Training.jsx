import React from "react";
import style from "./Training.module.css";

const Training = ({ onClick, name }) => {
  return (
    <div onClick={onClick} className={style.training}>
      <div>{name}</div>
    </div>
  );
};

export default Training;
