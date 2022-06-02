import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import Training from "../../components/Training";
import instance from "../../libs/instance";

const TrainingsPage = () => {
  const navigate = useNavigate();
  const [trainings, setTraining] = useState([]);

  useEffect(() => {
    getTrainings();
  }, []);

  const getTrainings = () => {
    instance
      .get("training/all")
      .then((r) => setTraining(r.data))
      .catch((e) => console.log(e));
  };

  return (
    <div className={"app"}>
      <Header />
      <div className={"wrap"}>
        <input className={"input"} placeholder={"Поиск"} />
        {trainings.map((item) => (
          <Training key={item._id} name={item.name} logic={item.logic} />
        ))}
      </div>
      <Footer>
        <Button
          text={"Добавить"}
          color={"green"}
          onClick={() => navigate("add")}
        />
      </Footer>
    </div>
  );
};

export default TrainingsPage;
