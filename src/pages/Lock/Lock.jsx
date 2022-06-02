import React, { useRef } from "react";
import style from "./Lock.module.css";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../navigation/Navigation";

const Lock = () => {
  const password = useRef();
  const navigate = useNavigate();

  const checkPassword = (pass) => {
    if (pass === "Admin Panelka") {
      localStorage.setItem("login", "true");
      navigate(ROUTES.SETS);
    } else {
      alert("Школьник свали отсюда, мамкин пидор");
    }
  };

  return (
    <div className={style.login}>
      <div className={style.text}>Admin Panelka</div>
      <input
        className={"input"}
        ref={password}
        placeholder={"Введите пароль"}
      />
      <Button
        text={"Вход"}
        onClick={() => checkPassword(password.current.value)}
      />
    </div>
  );
};

export default Lock;
