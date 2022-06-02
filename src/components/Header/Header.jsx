import React from "react";
import style from "./Header.module.css";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../navigation/Navigation";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={style.header}>
      <div className={style.title}>Admin Panelka</div>
      <div className={style.buttons}>
        <Button text={"Упражнения"} onClick={() => navigate(ROUTES.SETS)} />
        <Button
          text={"Тренировки"}
          onClick={() => navigate(ROUTES.TRAININGS)}
        />
      </div>
    </div>
  );
};

export default Header;
