import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from "../../components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../libs/instance";

const SetsAdd = () => {
  const navigate = useNavigate();
  const name = useRef();
  const description = useRef();
  const params = useParams();
  let id = params.id;
  const [alreadyExist, setAlreadyExist] = useState({});

  const getItem = () => {
    instance
      .get(`/set/${id}`)
      .then((r) => setAlreadyExist(r.data[0]))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (id === undefined) {
      id = "";
    } else {
      getItem();
    }
  }, [getItem]);

  const sendSet = (name, description) => {
    if (name !== "" && description !== "") {
      instance
        .post(`/set/${id}`, {
          name: { name },
          description: description,
        })
        .then((r) => console.log(r))
        .catch((e) => console.log(e));
    } else {
      alert("Ошибка заполните поля");
    }
  };

  return (
    <div className={"app"}>
      <Header />
      <div className={"wrap"}>
        <input
          className={"input"}
          defaultValue={alreadyExist.name}
          ref={name}
          placeholder={"Название"}
        />
        <input
          className={"input"}
          defaultValue={alreadyExist.description}
          ref={description}
          placeholder={"Описание"}
        />
      </div>
      <Footer>
        <Button
          text={"Добавить"}
          color={"green"}
          onClick={() => sendSet(name.current.value, description.current.value)}
        />
        <Button text={"Отмена"} color={"green"} onClick={() => navigate(-1)} />
      </Footer>
    </div>
  );
};

export default SetsAdd;
