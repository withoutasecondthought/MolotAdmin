import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from "../../components/ui/Button";
import Set from "../../components/Set";
import { useNavigate } from "react-router-dom";
import instance from "../../libs/instance";
import Skeleton from "../../components/Skeleton";

const SetsPage = () => {
  const navigate = useNavigate();
  const [sets, setSets] = useState([]);
  const [filteredSets, setFilteredSets] = useState([])

  useEffect(() => {
    getSets();
  }, []);

  useEffect(() => {
    setFilteredSets(sets)
  }, [sets])

  const getSets = () => {
    instance
      .get("/set/all")
      .then((r) => setSets(r.data))
      .catch((e) => console.log(e));
  };

  const filterArr = (e) => {
    setFilteredSets(
      sets.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const toSet = (id) => {
    navigate(`edit/${id}`);
  };

  return (

        <div className={"app"}>
          <Header />
          <div className={"wrap"}>
            <input
                onChange={(e) => filterArr(e)}
                id={"input"}
                className={"input"}
                placeholder={"Поиск"}
            />
            <Skeleton isLoaded={sets.length}>
              {filteredSets.map((set) => (
                  <Set
                      key={set.id}
                      id={set.id}
                      name={set.name}
                      description={set.description}
                      onClick={() => toSet(set._id)}
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

export default SetsPage;
