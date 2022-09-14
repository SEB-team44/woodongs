import React from "react";
import Login from "./pages/Login";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <>
      <div className="logo">
        <Link to={"/Login"}>
          <img src={require("../src/img/logo.png")} />
        </Link>
      </div>
    </>
  );
};

export default Main;
