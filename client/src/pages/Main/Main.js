import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Notice from "./Notice";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { UserInfo, UserLogin } from "../../UserContext";
import { useContext } from "react";
import useFetch from "../useFetch";
import study1 from "../../img/study1.jpg";
import study2 from "../../img/study2.jpg";
import study3 from "../../img/study3.jpg";
import study4 from "../../img/study4.jpg";
import study5 from "../../img/study5.jpg";

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

  //무한스크롤관련
  const [size, setSize] = useState(10);
  const [cursorId, setCursorid] = useState(0);
  const [fetching, setFetching] = useState(false); //추가 데이터를 로드하는지 아닌지를 담기위한 state
  const fetchMore = async () => {
    //추가데이터를 로드하는 상태로 전환
    setFetching(true);
  };

  const scroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
      //페이지 끝에 닿으면 추가데이터를 받아온다
      fetchMore();
      setSize(size + 10);
    }
  };

  // 만약 라이브러리 안쓰신다  대한님 방법
  // 1. size state 를 만든다. (size 초기값 10)
  // 2. 스크롤이 맨 밑에 닿을 때의 메소드를 만들어준다
  // 3. 스크롤이 맨 밑에 닿을 때 메소드 안에다가 setSize(size + 10) 해서 size 갱신
  // 4. 그것이 다시 164줄에 요청을해서 cardList 담아준다.
  // 5. cardList는 맵을 돌면서 늘어난 사이즈만큼 추가해서 보여준다.
  //6. cusor based pagination 은 size 10 넣고 10개의 목록이 나오면
  //다음 파라미터로 cusorId를 마지막 나온 게시물 숫자? 10? 넣으면 이어서 다음10개가 나옴

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
        fetch("https://woodongs.site/study/around?size=10", reqOption)
          .then((res) => {
            console.log("res", res);
            return res.json();
          })
          .then((data) => {
            console.log(data);
            return data;
          })
          .then((data) => setCardList(data.data))
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
        fetch("https://woodongs.site/study?size=10", reqOption)
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

  //랜덤이미지?
  const images = ["study1", "study2", "study3", "study4", "study5"];
  const chosenImage = images[Math.floor(Math.random() * 4)];
  const bgImage = document.createElement("img");
  bgImage.src = `${chosenImage}`;
  console.log(bgImage);

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
                          // src={bgImage}
                          src={study2}
                          // src={require("../../../src/img/businessplan.png")}
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
      </StyledMain>
    </>
  );
};

export default Main;
