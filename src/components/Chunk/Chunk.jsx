import React from "react";
import style from "./Chunk.module.css";
import ChunkItem from "../ChunkItem";

const Chunk = ({ reps, sets, onClick }) => {
  return (
    <div onClick={onClick} className={style.chunk}>
      <div className={style.reps}>Повторы: {reps}</div>
      {sets.map((item) => (
        <ChunkItem
          key={item._id}
          id={item.id}
          type={item.type}
          name={item.name}
          param={item.param}
        />
      ))}
    </div>
  );
};

export default Chunk;
