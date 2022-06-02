import React from "react";
import style from "./Set.module.css";

const Set = ({ onClick, name, description }) => {
  return (
    <div onClick={onClick} className={style.set}>
      <div>{name}</div>
      <div>{description}</div>
    </div>
  );
};

export default Set;
