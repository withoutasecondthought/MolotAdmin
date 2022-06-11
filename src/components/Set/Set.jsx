import React from "react";
import style from "./Set.module.css";

const Set = ({ id, onClick, name, description }) => {
  return (
    <div onClick={onClick} className={style.set}>
      <div>
        {id}. {name}
      </div>
      <div>{description.substring(0, 30)}</div>
    </div>
  );
};

export default Set;
