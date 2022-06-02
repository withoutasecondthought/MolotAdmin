import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SetsPage from "../pages/Sets";
import TrainingsPage from "../pages/Traininigs";
import SetsAdd from "../pages/SetsAdd";
import Lock from "../pages/Lock";

export const ROUTES = {
  LOCK_PAGE: "/",
  SETS: "/sets",
  SETS_ADD: "/sets/add",
  SETS_EDIT: "/sets/edit/:id",
  TRAININGS: "/trainings",
  TRAININGS_ADD: "/trainings/add",
  TRAINING_INFO: "/trainings/:id",
  CHUNKS_EDIT: "/training/:id/edit/:chunkId",
};

const Navigation = () => {
  const navigate = useNavigate();

  const checkLogged = () => {
    const logged = localStorage.getItem("login");
    if (logged === "true") {
      if (window.location.pathname === ROUTES.LOCK_PAGE) {
        navigate(ROUTES.SETS);
      }
    } else {
      if (window.location.pathname === ROUTES.LOCK_PAGE) {
        console.log("Вы не авторизованы");
      } else {
        navigate(ROUTES.LOCK_PAGE);
      }
    }
  };

  useEffect(() => {
    checkLogged();
  }, []);

  return (
    <Routes>
      <Route path={ROUTES.LOCK_PAGE} element={<Lock />} />
      <Route path={ROUTES.SETS} element={<SetsPage />} />
      <Route path={ROUTES.SETS_ADD} element={<SetsAdd />} />
      <Route path={ROUTES.SETS_EDIT} element={<SetsAdd />} />
      <Route path={ROUTES.TRAININGS} element={<TrainingsPage />} />
      <Route path={ROUTES.TRAININGS_ADD} element={<TrainingsPage />} />
      <Route path={ROUTES.TRAINING_INFO} element={<TrainingsPage />} />
      <Route path={ROUTES.CHUNKS_EDIT} element={<TrainingsPage />} />
    </Routes>
  );
};

export default Navigation;
