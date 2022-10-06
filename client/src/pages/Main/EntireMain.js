import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Notice from "./Notice";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { UserInfo } from "../../UserContext";
import { useContext } from "react";

const StyledEntireMain = styled.div`
  .main-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100vw;
    background-color: #dedede;
  }

  .main-nav-container {
    margin-bottom: 50px;
    height: 63.5px;
  }
  .main-notice-container {
    margin-bottom: 30px;
    border-radius: 10px;
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
    background-color: #f1f4f7;
    justify-content: space-around;
    align-items: center;
  }
  .cardlist {
    height: 450px;
    width: 400px;
    border: black solid 1px;
    margin-bottom: 80px;
    border-radius: 3%;
    margin: 20px 5px;
    background-color: white;
    justify-content: center;
  }
  .cardlists-box :nth-child(1) {
    margin-bottom: 10px;
  }
  .cardimg {
    width: 100%;
    /* border-top-left-radius: 5%;
    border-top-right-radius: 5%; */
  }
  .study-info-box {
    display: flex;
    flex-direction: column;
  }
  .study-info-header {
    color: black !important;
    text-decoration: none;
  }
  .study-info {
    margin-bottom: 10px;
    color: gray;
  }

  .tags {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 0px;
  }
  ol {
    padding-left: 0px;
  }
  li,
  a {
    text-decoration: none;
    list-style: none;
    color: black;
  }
  .count {
    padding: 16px;
  }

  .study-info-header {
    font-size: 1.5rem;
  }
`;

const EntireMain = () => {
  const access_token = localStorage.getItem("access_token");
  const [cardList, setCardList] = useState([]);
  const [reRender, setRerender] = useState(false);
  const [size, setSize] = useState(10);
  const [cursor, setCursor] = useState(0);

  function getCardList() {
    let reqOption = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        withCredentials: true,
        "Access-Control-Allow-Origin": "*",
        Authorization: access_token,
      },
    };

    let url;
    if (cursor) {
      url = `http://localhost:3000/study?size=5&cursorId=${cursor}`;
    } else {
      url = `http://localhost:3000/study?size=10`;
    }

    fetch(url, reqOption)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .then((data) => {
        setCardList([...cardList, ...data.data]);
        console.log(data.sliceInfo);
        if (data.sliceInfo.nextAvailable) {
          setCursor(data.sliceInfo.lastIdx);
          console.log(data.sliceInfo.lastIdx, cursor, cardList);
        }
      });
  }
  useEffect(() => {
    getCardList();
  }, [reRender]);

  useEffect(() => {
    // getCardList();
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight) {
        getCardList();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      <StyledEntireMain>
        <section className="main-container">
          <section className="main-nav-container">
            <Navbar
              currentLocation={"전체 스터디"}
              cardList={cardList}
              setCardList={setCardList}
              setRerender={setRerender}
              reRender={reRender}
            />
          </section>
          <section className="main-notice-container">
            <Notice title="전국" />
          </section>
          <section className="main-cardlist-container">
            <main className="cardlists-box">
              {cardList &&
                cardList.map((el, idx) => {
                  return (
                    <Card
                      key={el.studyId}
                      sx={{ maxWidth: 300 }}
                      className="cardlist"
                    >
                      {/* <article > */}
                      <CardMedia className="cardimg-box">
                        <img
                          className="cardimg"
                          src={require("../../../src/img/businessplan.png")}
                        ></img>
                      </CardMedia>
                      <CardContent className="study-info-box">
                        <header className="study-info study-info-header">
                          {/* <Link to="/recruit">{el.title}</Link> */}
                          {/* <Link to={"/study/" + `${el.id}`}>{el.title}</Link> */}
                          <Link to={"/study/" + `${el.studyId}`}>{`[${
                            el.city === "" ? "전국" : el.city
                          }]${el.title}`}</Link>
                        </header>
                        <a className="study-info">{el.content}</a>
                        <ol className="study-info tags">
                          <li>{el.category}</li>
                        </ol>
                      </CardContent>
                      <div className="count">
                        <a>모집완료 0/{el.headCount}</a>
                      </div>
                      {/* </article> */}
                    </Card>
                  );
                })}
            </main>
          </section>

          <section className="main-footer-container">
            <Footer />
          </section>
        </section>
      </StyledEntireMain>
    </>
  );
};
export default EntireMain;
