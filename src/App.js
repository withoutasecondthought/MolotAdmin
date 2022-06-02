import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className={"app"}>
      <Header />
      <div className={"wrap"}></div>
      <Footer />
    </div>
  );
};

export default App;
