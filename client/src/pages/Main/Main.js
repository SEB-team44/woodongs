import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Notice from "./Notice";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { UserInfo, UserLogin } from "../../UserContext";
import { useContext } from "react";
import useFetch from "../useFetch";

const StyledMain = styled.div`
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
  li {
    list-style: none;
  }
  .count {
    padding: 16px;
  }

  .study-info-header {
    font-size: 1.5rem;
  }
`;

const Main = () => {
  const access_token = localStorage.getItem("access_token");
  const getlat = localStorage.getItem("latitude");
  const getlong = localStorage.getItem("longitude");
  const [cardList, setCardList] = useState([]);
  const [reRender, setRerender] = useState(false);
  const { isLogin } = useContext(UserLogin);
  const { userInfo } = useContext(UserInfo);
  const myAround = true;
  const header = {
    "Content-Type": "application/json",
    Accept: "application/json",
    withCredentials: true,
    "Access-Control-Allow-Origin": "*",
    Authorization: access_token,
  };

  // //무한스크롤관련
  // const [item, setItem] = useState([]);
  // const [target, setTarget] = useState(null);
  // const page = 10;

  // const fetchData = async () => {
  //   const response = await fetch(`http://3.35.188.110:8080/study`);
  //   page++;
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  // useEffect(() => {
  //   let observer;
  //   if (target) {
  //     const onIntersect = async ([entry], observer) => {
  //       if (entry.isIntersecting) {
  //         observer.unobserve(entry.target);
  //         await fetchData();
  //         observer.observe(entry.target);
  //       }
  //     };
  //     observer = new IntersectionObserver(onIntersect, { threshold: 1 });
  //     observer.observe(target);
  //   }
  //   return () => observer && observer.disconnect();
  // }, [target]);

  useEffect(() => {
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
      if (getlat) {
        fetch("http://3.35.188.110:8080/study/around?page=0", reqOption)
          .then((res) => {
            console.log("res", res);
            return res.json();
          })
          .then((data) => {
            console.log(data);
            return data;
          })
          .then((data) => setCardList(data))
          .catch((error) => console.log(error));

        // fetch("http://3.35.188.110:8080/study/recruit/dummy", {
        //   method : "POST",
        //   headers : header,
        //   body: JSON.stringify({
        //     latitute: Number(getlat),
        //     longitute: Number(getlong)
        //   })
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     return console.log(data);
        //   })
        //   .catch((error) => console.log("error",error))
      } else {
        fetch("http://3.35.188.110:8080/study?size=20", reqOption)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            return data;
          })
          .then((data) => setCardList(data.data));
      }
    }
    getCardList();
  }, [reRender]);

  return (
    <>
      <StyledMain>
        <section className="main-container">
          <section className="main-nav-container">
            <Navbar myAround={myAround} />
          </section>
          <section className="main-notice-container">
            {getlat ? (
              isLogin ? (
                <Notice title={userInfo.city} />
              ) : (
                <Notice title="전국" />
              )
            ) : (
              <Notice title="전국" />
            )}
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
              {/* <div ref={setTarget}>this is target</div> */}
            </main>
          </section>
          <section className="main-footer-container">
            <Footer />
          </section>
        </section>
      </StyledMain>
    </>
  );
};

export default Main;
