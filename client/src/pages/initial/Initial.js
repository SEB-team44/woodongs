import React from "react";
import styled from "styled-components";
import { Intro } from "./Intro";
import { Body } from "./body";
import { introduce } from "../initial/intro_utile";
const Initial = () => {
  return (
    <InitialStyled>
      <section className="initial-container">
        <main className="main-box">
          <Intro deliver={introduce} />
          <Body />
        </main>
      </section>
    </InitialStyled>
  );
};

const InitialStyled = styled.div`
  .initial-container {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .main-box {
    display: flex;
    flex-direction: column;
    width: 100vw;

    text-align: center;
    transition: all 0.3s ease-in-out;
  }

  @media (min-width: 1200px) {
    .main-box {
      text-align: center;
      width: 1200px;
      margin-right: 10vw;
      margin-left: 10vw;
    }
  }
`;

export default Initial;
