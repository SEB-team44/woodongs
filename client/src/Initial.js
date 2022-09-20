import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const InitialStyled = styled.div`
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #dedede;
  }
`;
const Initial = () => {
  return (
    <InitialStyled>
      <div className="container">
        <div className="logo">
          <Link to={"/login"}>
            <img src={require("../src/img/logo.png")} />
          </Link>
        </div>
      </div>
    </InitialStyled>
  );
};

export default Initial;
