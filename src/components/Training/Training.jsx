import React, { useEffect, useState } from "react";
import instance from "../../libs/instance";
import style from "./Training.module.css";

const Training = ({ name, logic }) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    parseExercises();
  }, []);

  const parseExercises = () => {
    logic.map((item) =>
      instance
        .get(`/set/${item}`)
        .then((r) => setExercises([...exercises, r.data.name]))
    );
  };

  return (
    <div className={style.training}>
      <div>{name}</div>
      <div>
        {exercises.map((item) => (
          <div key={Math.random()}>{item}</div>
        ))}
      </div>
    </div>
  );
};

export default Training;
