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

  const getTraining = () => {
    instance
      .get(`/training/${params.id}`)
      .then((r) => {
        setTraining(r.data[0]);
        setLogic(r.data[0].logic);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getTraining();
  }, []);

  return (
    <div className={"app"}>
      <Header />
      <div className={"wrap"}>
        <div className={style.title}>{training.name}</div>
        <Skeleton isLoaded={logic.length}>
          <div className={style.map}>
            <Button
              text={"Добавить блок здесь"}
              onClick={() => {
                navigate("add/0");
              }}
            />
            {logic.map((item, index) => (
              <div className={style.item}>
                <Chunk
                  onClick={() => navigate(`add/${item._id}`)}
                  key={item._id}
                  reps={item.reps}
                  sets={item.sets}
                />
                <Button
                  onClick={() => {
                    navigate(`add/${index + 1}`);
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
