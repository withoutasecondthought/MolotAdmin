import React, { useEffect, useRef, useState } from "react";
import style from "./ChunkSet.module.css";
import Button from "../ui/Button";

const ChunkSet = ({ _id, id, name, type, param, onDelete, onChange }) => {
  const [changeType, setChangeType] = useState(false);
  const parameters = useRef();

  useEffect(() => {
    switch (type) {
      case "time":
        break;
      case "reps":
        setChangeType(true);
        break;
    }
  }, []);

  const onChangeHandler = () => {
    const tp = changeType ? "reps" : "time";
    onChange({
      type: tp,
      param: parameters.current.value,
    });
  };

  return (
    <div className={style.chunk}>
      <div className={style.title}>
        {id}. {name}
      </div>
      <div
        className={style.selection}
        onClick={() => {
          setChangeType((prevState) => !prevState);
          onChangeHandler();
        }}
      >
        <div className={changeType === false ? style.selected : ""}>
          По времени
        </div>
        |
        <div className={changeType === true ? style.selected : ""}>
          По повторам
        </div>
      </div>
      <input
        className={"input"}
        placeholder={"Значение"}
        defaultValue={param}
        ref={parameters}
        onChange={onChangeHandler}
      />
      <Button text={"Удалить"} onClick={onDelete} />
    </div>
  );
};

export default ChunkSet;
