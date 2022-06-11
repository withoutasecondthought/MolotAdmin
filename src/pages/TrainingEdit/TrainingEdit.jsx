import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from "../../components/ui/Button";
import instance from "../../libs/instance";
import style from "./TrainingEdit.module.css";
import Chunk from "../../components/Chunk";
import Skeleton from "../../components/Skeleton";

const TrainingEdit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [training, setTraining] = useState({});
  const [logic, setLogic] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getTraining = () => {
    instance
      .get(`/training/${params.id}`)
      .then((r) => {
        setTraining(r.data);
        setLogic(r.data.logic);
        setLoaded(true);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getTraining();
  }, []);

  const newChunk = (index) => {
    setLoaded(false);
    instance
      .post("/chunk", {
        trainingId: params.id,
        index,
      })
      .then((r) => navigate(`add/${r.data._id}`))
      .catch((e) => console.log(e));
  };

  const deleteChunk = (_id) => {
    setLoaded(false);
    instance
      .post(`/chunk/delete/${params.id}/${_id}`, {})
      .then(() => getTraining())
      .catch((e) => console.log(e));
  };

  return (
    <div className={"app"}>
      <Header />
      <div className={"wrap"}>
        <div className={style.title}>{training?.name}</div>
        <Skeleton isLoaded={loaded}>
          <div className={style.map}>
            <Button
              text={"Добавить блок здесь"}
              onClick={() => {
                newChunk(0);
              }}
            />
            {logic.map((item, index) => (
              <div key={item._id} className={style.item}>
                <Chunk
                  onClick={() => navigate(`add/${item._id}`)}
                  reps={item.reps}
                  sets={item.sets}
                  onDelete={() => deleteChunk(item._id)}
                />
                <Button
                  onClick={() => {
                    newChunk(index + 1);
                  }}
                  key={Math.random()}
                  text={"Добавить блок здесь"}
                />{" "}
              </div>
            ))}
          </div>
        </Skeleton>
      </div>
      <Footer>
        <Button text={"Отмена"} onClick={() => navigate(-1)} color={"red"} />
      </Footer>
    </div>
  );
};

export default TrainingEdit;
