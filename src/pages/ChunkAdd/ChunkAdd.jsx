import React, { useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from "../../components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import style from "./ChunkAdd.module.css";
import Skeleton from "../../components/Skeleton";
import Set from "../../components/Set";
import { useEffect, useState } from "react";
import instance from "../../libs/instance";
import ChunkSet from "../../components/ChunkSet";

const ChunkAdd = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [sets, setSets] = useState([]);
  const [filteredSets, setFilteredSets] = useState([]);
  const [chunkSets, setChunkSets] = useState([]);
  let Default = "";
  const reps = useRef();
  let id = params.chunkId;

  useEffect(() => {
    getSets();
    getChunks();
  }, []);

  useEffect(() => {
    setFilteredSets(sets);
  }, [sets]);

  const getSets = () => {
    instance
      .get("/set/all")
      .then((r) => setSets(r.data))
      .catch((e) => console.log(e));
  };

  const filterArr = (e) => {
    setFilteredSets(
      sets.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const pushSet = (_id, id, name) => {
    setChunkSets([...chunkSets, { _id, id, name, type: "time", param: 0 }]);
  };

  const onDeleteSet = (index) => {
    let chunkRep = [...chunkSets];
    chunkRep.splice(index, 1);
    setChunkSets(chunkRep);
  };

  const onChangeSet = (data, index) => {
    const localChunk = [...chunkSets];
    localChunk[index] = {
      ...localChunk[index],
      type: data.type,
      param: data.param,
    };
    setChunkSets(localChunk);
  };

  const getChunks = () => {
    if (id === undefined || id.length < 7) {
      return 0;
    } else {
      instance
        .get(`/chunk/${id}`)
        .then((r) => {
          Default = r.data.reps;
          setChunkSets(r.data.sets);
        })
        .catch((e) => console.log(e));
    }
  };

  const getReadyForSend = () => {
    let times = reps.current.value;

    if (times !== "") {
      times = +times;
    } else {
      alert("Введите число");
      return 0;
    }

    if (chunkSets.length !== 0) {
    } else {
      alert("Заполните Массив");
      return 0;
    }
    const req = {
      reps: times,
      sets: [],
    };
    chunkSets.forEach((item) =>
      req.sets.push({
        type: item.type,
        param: +item.param,
        info: item._id,
      })
    );
    instance
      .post(`/chunk/${id}`, req)
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  };

  return (
    <div className={"app"}>
      <Header />
      <div className={style.wrap}>
        <div className={"wrap"}>
          <input
            onChange={(e) => filterArr(e)}
            id={"input"}
            className={"input"}
            placeholder={"Поиск"}
          />
          <Skeleton isLoaded={sets.length}>
            {filteredSets.map((set) => (
              <Set
                key={set.id}
                id={set.id}
                name={set.name}
                description={set.description}
                onClick={() => pushSet(set._id, set.id, set.name)}
              />
            ))}
          </Skeleton>
        </div>
        <div className={"wrap"}>
          <input
            className={"input"}
            placeholder={"Повторения"}
            type={"number"}
            ref={reps}
            defaultValue={Default}
          />
          {chunkSets.map((item, index) => (
            <ChunkSet
              name={item.name}
              param={item.param}
              type={item.type}
              id={index + 1}
              onDelete={() => {
                onDeleteSet(index);
                console.log(index);
              }}
              onChange={(data) => {
                onChangeSet(data, index);
                console.log(index);
              }}
            />
          ))}
        </div>
      </div>
      <Footer>
        <Button
          text={"Сохранить"}
          color={"green"}
          onClick={() => getReadyForSend()}
        />
        <Button text={"Отмена"} color={"red"} onClick={() => navigate(-1)} />
        <Button text={"Logs"} onClick={() => console.log(chunkSets)} />
      </Footer>
    </div>
  );
};

export default ChunkAdd;
