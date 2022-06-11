import React, { useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import instance from "../../libs/instance";
import { ROUTES } from "../../navigation/Navigation";

const TrainingAdd = () => {
  const navigate = useNavigate();
  const name = useRef();

  const addTraining = (name) => {
    instance
      .post("/training", {
        name,
      })
      .then(() => {
        navigate(ROUTES.TRAININGS);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className={"app"}>
      <Header />
      <div className={"wrap"}>
        <input
          ref={name}
          className={"input"}
          placeholder={"Название тренировки"}
        />
      </div>
      <Footer>
        <Button
          color={"green"}
          text={"Добавить тренировку"}
          onClick={() => addTraining(name.current.value)}
        />
        <Button color={"red"} text={"Отмена"} onClick={() => navigate(-1)} />
      </Footer>
    </div>
  );
};

export default TrainingAdd;
