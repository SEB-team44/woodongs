import React from "react";
import Login from "./pages/Login";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Initial = () => {
  return (
    <>
      <div className="logo">
        <Link to={"/login"}>
          <img src={require("../src/img/logo.png")} />
        </Link>
      </div>
    </>
  );
};

export default Initial;
