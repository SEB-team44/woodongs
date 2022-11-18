import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "@mui/material/Button";

const InitialStyled = styled.div`
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #dedede;
  }
  .start-box {
    text-align: center;
  }
  .link{
    text-decoration: none
  }
`;
const Initial = () => {
  return (
    <InitialStyled>
      <div className="container">
        <div className="logo">
          <Link to={"/login"} className="link">
            <img src={require("../src/img/logo.png")} />
            <div className="start-box">
              <Button variant="contained" >click to start! </Button>
            </div>
          </Link>
        </div>
      </div>
    </InitialStyled>
  );
};

export default Initial;
