import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from "../../components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../libs/instance";
import { ROUTES } from "../../navigation/Navigation";
import Skeleton from "../../components/Skeleton";

const SetsAdd = () => {
  const navigate = useNavigate();
  const name = useRef();
  const description = useRef();
  const params = useParams();
  let { id } = params;
  const [alreadyExist, setAlreadyExist] = useState({});

  const getItem = () => {
    instance
      .get(`/set/${id}`)
      .then((r) => setAlreadyExist(r.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (id === undefined) {
      id = "";
    } else {
      getItem();
    }
  }, []);

  const sendSet = (name, description) => {
    if (name !== "") {
      instance
        .post(`/set/${id}`, {
          name,
          description,
        })
        .then(() => navigate(ROUTES.SETS))
        .catch((e) => console.log(e));
    } else {
      alert("Ошибка заполните поля");
    }
  };

  return (
    <div className={"app"}>
      <Header />
      <div className={"wrap"}>
        <Skeleton isLoaded={!id || alreadyExist?.name}>
          <input
            className={"input"}
            defaultValue={alreadyExist.name}
            ref={name}
            placeholder={"Название"}
          />
          <textarea
            className={"textarea"}
            defaultValue={alreadyExist.description}
            ref={description}
            placeholder={"Описание"}
          />
        </Skeleton>
      </div>
      <Footer>
        <Button
          text={"Сохранить"}
          color={"green"}
          onClick={() => sendSet(name.current.value, description.current.value)}
        />
        <Button text={"Отмена"} color={"green"} onClick={() => navigate(-1)} />
      </Footer>
    </div>
  );
};

export default SetsAdd;
