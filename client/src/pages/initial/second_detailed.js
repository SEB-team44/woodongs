import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "@mui/material/Button";

export const Second_detailed = () => {
  return (
    <SecondDetailed>
      <article className="detailed-second">
        <section className="second-picture">
          <img className="second-img" src={require("../../img/screen.png")} />
        </section>

        <section className="second-box">
          <h1 className="heading-second">
            스터디 참여를 위한 이동 시간이 아깝지 않으셨나요?
          </h1>
          <h2 className="heading subtitle">
            우리 동네 스터디, Woodongs를 이용해 보세요!
          </h2>
          <h2 className="sub-heading">
            반경 3km 주변의 스터디에 가입하고 채팅방을 이용하여 생산성을
            높혀보세요!
          </h2>
          <Link to={"/login"} className="link">
            {/* <Button disabled={true} variant="contained">Get started!</Button> */}
          </Link>
        </section>
      </article>
    </SecondDetailed>
  );
};

const SecondDetailed = styled.div`
  .detailed-second {
    display: flex;
    flex-direction: row;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 20px;
    padding-bottom: 60px;
  }
  .second-box {
    width: 40%;
    padding-right: 40px;
    transition: 0.8s;
  }

  .heading-second {
    font-size: 32px;
    font-weight: 700;
    color: #484848;
    margin-bottom: 10px;
    line-height: 1;
    margin-top: 30px;
    font: "Rodoto", sans-serif;
  }
  .subtitle {
    margin-top: 0px;
    margin-bottom: 35px;
  }
  .sub-heading {
    font-size: 26px;
    color: #0049ee;
    font-weight: 100;
    margin-bottom: 30px;
  }

  .second-picture {
    text-align: center;
    width: 60%;
    padding-top: 20px;
    padding-bottom: 10%;
  }
  .second-img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    border: 10px solid black;
  }
  @media (min-width: 1200px) {
    .second-picture {
      text-align: center;
      padding-top: 20px;
      width: 760px;
      height: 500px;
    }
  }
  @media (max-width: 700px) {
    .second-container {
      display: flex;
      flex-direction: column;
    }
    .second-box {
      width: 100%;
      text-align: left;
    }
    .second-picture {
      width: 100%;
    }
  }
`;
