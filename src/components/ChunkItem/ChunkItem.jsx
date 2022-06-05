import React, { useEffect, useState } from "react";

const ChunkItem = ({ id, type, param, name }) => {
  const [types, setTypes] = useState("");

  const checkType = () => {
    switch (type) {
      case "time":
        setTypes("Секунд");
        break;
      case "reps":
        setTypes("Повторов");
        break;
    }
  };

  useEffect(() => {
    checkType();
  }, []);

  return (
    <div>
      <div>
        {id}. {name}
      </div>
      <div>
        {param} {types}
      </div>
    </div>
  );
};

export default ChunkItem;
