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
  //constants
  const params = useParams();
  const navigate = useNavigate();
  const [sets, setSets] = useState([]);
  const [filteredSets, setFilteredSets] = useState([]);
  const [chunkSets, setChunkSets] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [Default, setDefault] = useState("");
  const reps = useRef();
  let id = params.chunkId;

  //list
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
    setChunkSets([
      ...chunkSets,
      { _id, id, name, type: "time", param: 0, math: Math.random() },
    ]);
  };

  const onDeleteSet = (math) => {
    setChunkSets(chunkSets.filter((item) => item.math !== math));
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
    if (id === undefined) {
      navigate(-1);
      return 0;
    } else {
      instance
        .get(`/chunk/${id}`)
        .then((r) => {
          const chunkRep = [];
          setDefault(r.data.reps);
          r.data.sets.map((item) => {
            chunkRep.push({
              _id: item.info._id,
              name: item.info.name,
              type: item.type,
              param: item.param,
              math: Math.random(),
            });
            setChunkSets(chunkRep);
          });
        })
        .catch((e) => console.log(e));
    }
  };

  useEffect(() => {
    getSets();
    getChunks();
    setLoaded(true);
  }, []);

  useEffect(() => {
    setFilteredSets(sets);
  }, [sets]);

  //send Chunks
  const sendChunk = () => {
    setLoaded(false);
    let times = reps.current.value;
    let checker = true;

    if (times !== "") {
      times = +times;
    } else {
      alert("Введите число");
      setLoaded(true);
      return 0;
    }

    if (chunkSets.length !== 0) {
    } else {
      alert("Заполните Массив");
      setLoaded(true);
      return 0;
    }
    const req = {
      reps: times,
      sets: [],
    };
    chunkSets.forEach((item) => {
      if (item.param === 0) {
        alert("Упражнение не может длиться  повторяться 0 раз  секунд");
        checker = false;
      }
    });
    if (checker === false) {
      setLoaded(true);
      return 0;
    }
    chunkSets.forEach((item) =>
      req.sets.push({
        type: item.type,
        param: +item.param,
        info: item._id,
      })
    );

    instance
      .post(`/chunk/${id}`, { ...req })
      .then(() => {
        navigate(-1);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className={"app"}>
      <Header />
      <div className={style.wrap}>
        <div className={"wrap"}>
          <Skeleton isLoaded={sets.length}>
            <input
              onChange={(e) => filterArr(e)}
              id={"input"}
              className={"input"}
              placeholder={"Поиск"}
            />

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
          <Skeleton isLoaded={sets.length && loaded}>
            <input
              className={"input"}
              placeholder={"Повторения"}
              type={"number"}
              ref={reps}
              defaultValue={Default}
            />
            {chunkSets.map((item, index) => (
              <ChunkSet
                key={item.math}
                name={item.name}
                param={item.param}
                type={item.type}
                id={index + 1}
                onDelete={() => {
                  onDeleteSet(item.math);
                }}
                onChange={(data) => {
                  onChangeSet(data, index);
                }}
              />
            ))}
          </Skeleton>
        </div>
      </div>
      <Footer>
        <Button
          text={"Сохранить"}
          color={"green"}
          onClick={() => sendChunk()}
        />
        <Button text={"Отмена"} color={"red"} onClick={() => navigate(-1)} />
      </Footer>
    </div>
  );
};

export default ChunkAdd;
