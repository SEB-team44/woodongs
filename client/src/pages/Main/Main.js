import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Notice from "./Notice";
const StyledMain = styled.div`
  .main-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 98vw;
    border: solid black 1px;
  }

  .main-nav-container {
    margin-bottom: 50px;
    height: 63.5px;
  }
  .main-notice-container {
    margin-bottom: 30px;
  }
  .main-cardlist-container {
    border: solid black 1px;
    margin-left: 30px;
    margin-right: 30px;
    /* height: 100%; */
  }
  .cardlists-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .cardlist {
    height: 500px;
    width: 400px;
    border: black solid 1px;
    margin-bottom: 80px;
    border-radius: 5%;
  }
  .cardlist :nth-child(1){
    margin-bottom:10px;
  }
  .cardimg{
    width: 100%;
    border-top-left-radius: 5%;
    border-top-right-radius: 5%;

  }
  .study-info-box {
    display: flex;
    flex-direction: column;
  }
  .study-info-header{
    color: black !important;
  }
  .study-info{
    margin-bottom: 10px;
    color: gray;
  }

  .tags {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top:0px;
  }
  ol{
    padding-left: 0px;
  }
  li {
    list-style: none;
  }

  .study-info-header{
    font-size: 1.5rem;
  }
`;

const Main = () => {
  return (
    <>
      <StyledMain>
        <main className="main-container">
          <section className="main-nav-container">
            <Navbar />
          </section>

          <section className="main-notice-container">
            <Notice />
          </section>
          <section className="main-cardlist-container">
            <div className="cardlists-box">
              <article className="cardlist">
                <div className="cardimg-box">
                  <img
                    className="cardimg" 
                    src={require("../../../src/img/businessplan.png")}>
                  </img>
                </div>
                <div className="study-info-box">
                  <header className="study-info study-info-header">{`[서울] 프론트엔드 스터디`}</header>
                  <a className="study-info">프론트엔드 공부할 사람~</a>
                  <ol className="study-info tags">
                    <li>#JS</li>
                    <li>#React</li>
                    <li>#CSS</li>
                  </ol>
                </div>
                <div className="">
                  <a>모집완료 0/3</a>
                </div>
              </article>
              <article className="cardlist">
                <div className="cardimg-box">
                  <img
                    className="cardimg" 
                    src={require("../../../src/img/businessplan.png")}>
                  </img>
                </div>
                <div className="study-info-box">
                  <header className="study-info study-info-header">{`[서울] 프론트엔드 스터디`}</header>
                  <a className="study-info">프론트엔드 공부할 사람~</a>
                  <ol className="study-info tags">
                    <li>#JS</li>
                    <li>#React</li>
                    <li>#CSS</li>
                  </ol>
                </div>
                <div className="">
                  <a>모집완료 0/3</a>
                </div>
              </article><article className="cardlist">
                <div className="cardimg-box">
                  <img
                    className="cardimg" 
                    src={require("../../../src/img/businessplan.png")}>
                  </img>
                </div>
                <div className="study-info-box">
                  <header className="study-info study-info-header">{`[서울] 프론트엔드 스터디`}</header>
                  <a className="study-info">프론트엔드 공부할 사람~</a>
                  <ol className="study-info tags">
                    <li>#JS</li>
                    <li>#React</li>
                    <li>#CSS</li>
                  </ol>
                </div>
                <div className="">
                  <a>모집완료 0/3</a>
                </div>
              </article><article className="cardlist">
                <div className="cardimg-box">
                  <img
                    className="cardimg" 
                    src={require("../../../src/img/businessplan.png")}>
                  </img>
                </div>
                <div className="study-info-box">
                  <header className="study-info study-info-header">{`[서울] 프론트엔드 스터디`}</header>
                  <a className="study-info">프론트엔드 공부할 사람~</a>
                  <ol className="study-info tags">
                    <li>#JS</li>
                    <li>#React</li>
                    <li>#CSS</li>
                  </ol>
                </div>
                <div className="">
                  <a>모집완료 0/3</a>
                </div>
              </article><article className="cardlist">
                <div className="cardimg-box">
                  <img
                    className="cardimg" 
                    src={require("../../../src/img/businessplan.png")}>
                  </img>
                </div>
                <div className="study-info-box">
                  <header className="study-info study-info-header">{`[서울] 프론트엔드 스터디`}</header>
                  <a className="study-info">프론트엔드 공부할 사람~</a>
                  <ol className="study-info tags">
                    <li>#JS</li>
                    <li>#React</li>
                    <li>#CSS</li>
                  </ol>
                </div>
                <div className="">
                  <a>모집완료 0/3</a>
                </div>
              </article><article className="cardlist">
                <div className="cardimg-box">
                  <img
                    className="cardimg" 
                    src={require("../../../src/img/businessplan.png")}>
                  </img>
                </div>
                <div className="study-info-box">
                  <header className="study-info study-info-header">{`[서울] 프론트엔드 스터디`}</header>
                  <a className="study-info">프론트엔드 공부할 사람~</a>
                  <ol className="study-info tags">
                    <li>#JS</li>
                    <li>#React</li>
                    <li>#CSS</li>
                  </ol>
                </div>
                <div className="">
                  <a>모집완료 0/3</a>
                </div>
              </article><article className="cardlist">
                <div className="cardimg-box">
                  <img
                    className="cardimg" 
                    src={require("../../../src/img/businessplan.png")}>
                  </img>
                </div>
                <div className="study-info-box">
                  <header className="study-info study-info-header">{`[서울] 프론트엔드 스터디`}</header>
                  <a className="study-info">프론트엔드 공부할 사람~</a>
                  <ol className="study-info tags">
                    <li>#JS</li>
                    <li>#React</li>
                    <li>#CSS</li>
                  </ol>
                </div>
                <div className="">
                  <a>모집완료 0/3</a>
                </div>
              </article><article className="cardlist">
                <div className="cardimg-box">
                  <img
                    className="cardimg" 
                    src={require("../../../src/img/businessplan.png")}>
                  </img>
                </div>
                <div className="study-info-box">
                  <header className="study-info study-info-header">{`[서울] 프론트엔드 스터디`}</header>
                  <a className="study-info">프론트엔드 공부할 사람~</a>
                  <ol className="study-info tags">
                    <li>#JS</li>
                    <li>#React</li>
                    <li>#CSS</li>
                  </ol>
                </div>
                <div className="">
                  <a>모집완료 0/3</a>
                </div>
              </article>
            </div>
          </section>
        </main>
      </StyledMain>
    </>
  );
};

export default Main;
