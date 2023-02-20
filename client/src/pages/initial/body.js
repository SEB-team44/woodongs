import React from "react";
import styled from "styled-components";
import { First_detailed } from "./first_detailed";
import { Second_detailed } from "./second_detailed";
export const Body = () => {
  return (
    <BodyStyled>
      <main>
        <article className="body-container">
          <section className="body-box">
            <h2 className="body-title">HOW TO USE?</h2>
            <hr className="separator" />
            <p>
              회원 가입 후, 조금만 기다려주시면 회원님의 위치를 엑세스 합니다.
              위치 정보 허용을 하지 않으셨다구요? 걱정마세요, 로그인 뒤에도
              언제든 가능니까요! 자, 이제 모든 준비가 다 끝났습니다.
            </p>
          </section>
          <section className="body-picture">
            <img className="login-img" src={require("../../img/login.png")} />
          </section>
        </article>

        <article className="detail-container">
          <First_detailed />
          <p id="comming">Cooming Soon</p>
          <Second_detailed />
          <p id="comming">Cooming Soon</p>
        </article>
      </main>
    </BodyStyled>
  );
};

const BodyStyled = styled.div`
  #comming {
    opacity: 400;
    font-size: 100px;
    margin-top: -350px;
  }

  main {
    display: flex;
    flex-direction: column;
  }
  .body-container {
    width: 100%;
    height: 800px;
  }
  .body-box {
    padding-top: 40px;
    padding-bottom: 100px;
    background-color: #0049ee;
  }
  .body-box > * {
    color: white;
    padding-left: 5%;
    padding-right: 5%;
  }
  .body-title {
    font-size: 37px;
  }

  .separator {
    width: 34px;
    border-top: 2px solid #fff;
    margin-bottom: 30px;
  }
  p {
    line-height: 1.6;
  }
  .login-img {
    width: 40%;
    height: 40%;
    border-radius: 20px;
    border: 10px solid black;
    margin-top: -80px;
  }

  .detail-box {
    width: 100%;
    height: 800px;
  }

  .detail-container {
    opacity: 0.1;
  }

  @media (max-width: 700px) {
    .body-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding-top: 40px;
      padding-bottom: 40px;
    }
    .login-img {
      display: none;
    }
  }

  @media (min-width: 780px) {
    .login-img {
      height: 470px;
    }
  }
`;
