import React from "react";
import style from "./Chunk.module.css";
import ChunkItem from "../ChunkItem";
import Button from "../ui/Button";

const Chunk = ({ reps, sets, onClick, onDelete }) => {
  return (
    <div className={style.chunk}>
      <div onClick={onClick}>
        <div className={style.reps}>Повторы: {reps}</div>
        {sets.map((item, index) => (
          <ChunkItem
            key={item._id}
            id={index + 1}
            type={item.type}
            name={item.info?.name}
            param={item.param}
          />
        ))}
      </div>
      <Button text={"Удалить"} onClick={onDelete} />
    </div>
  );
};

export default Chunk;
