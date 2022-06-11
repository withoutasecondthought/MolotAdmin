import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import Training from "../../components/Training";
import instance from "../../libs/instance";
import Skeleton from "../../components/Skeleton";

const TrainingsPage = () => {
  const navigate = useNavigate();
  const [trainings, setTrainings] = useState([]);
  const [filteredTrainings, setFilteredTrainings] = useState([]);

  useEffect(() => {
    getTrainings();
  }, []);

  useEffect(() => {
    setFilteredTrainings(trainings);
  }, [trainings]);

  const getTrainings = () => {
    instance
      .get("training/all")
      .then((r) => setTrainings(r.data))
      .catch((e) => console.log(e));
  };

  const filterArr = (e) => {
    setFilteredTrainings(
      trainings.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className={"app"}>
      <Header />
      <div className={"wrap"}>
        <input
          onChange={(e) => filterArr(e)}
          className={"input"}
          placeholder={"Поиск"}
        />
        <Skeleton isLoaded={filteredTrainings.length}>
          {filteredTrainings.map((item) => (
            <Training
              onClick={() => navigate(item._id)}
              key={item._id}
              name={item.name}
            />
          ))}
        </Skeleton>
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
