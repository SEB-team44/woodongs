import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Notice from "./Notice";
import { useState, useEffect, } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import study1 from "../../img/study1.jpg";
import study2 from "../../img/study2.jpg";
import study3 from "../../img/study3.jpg";
import study4 from "../../img/study4.jpg";
import study5 from "../../img/study5.jpg";
import CircularProgress from "@mui/material/CircularProgress";
import { axiosInstance } from "../utiles/axiosInstance";

const EntireMain = () => {
  const access_token = localStorage.getItem("access_token");
  const [cardList, setCardList] = useState([]);
  const [reRender, setRerender] = useState(false);
  const [size, setSize] = useState(10);
  const [cursor, setCursor] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const getlat = localStorage.getItem("latitude");


  const getCardList = async () => {
    let reqOption = {
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
    };

    let url;

    if (cursor) {
      url = `5&cursorId=${cursor}`;
    } else {
      url = `10`;
    }
    if (!isAvailable) {
      return;
    } else {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          `/study?size=${url}`,
          reqOption
        );
        // infinate scroll info
        const { nextAvailable, lastIdx } = response.data.sliceInfo;

        setTimeout(() => {
          setCardList([...cardList, ...response.data.data]);
          nextAvailable ? setCursor(lastIdx) : setIsAvailable(false);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        setIsLoading(false)
        alert(error);
      }
    }
  };


  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      getCardList();
    }
  };


  useEffect(() => {
    getCardList();
  }, [reRender]);


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });


  //랜덤이미지?
  const images = [study1, study2, study3, study4, study5];
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
            <Notice title ="전국"/>
          </section>
          <section
            className={`${
              isLoading
                ? "cardlists-container--loading"
                : "main-cardlist-container"
            }`}
          >
            <main className="cardlists-box">
              {cardList &&
                cardList.map((el) => {
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
                          src={images[Math.floor(Math.random() * 5)]}
                        ></img>
                      </CardMedia>
                      <CardContent className="study-info-box">
                        <header className="study-info study-info-header">
                          <Link to={"/study/" + `${el.studyId}`}>{`[${
                            el.city === "" ? "전국" : el.city
                          }]  ${el.title}`}</Link>
                        </header>
                        <a className="study-info">{el.content}</a>
                        <ol className="study-info tags">
                          <li>{el.category}</li>
                        </ol>
                      </CardContent>
                      <div className="count">
                        <a>
                          모집완료 {el.nowHeadCount}/{el.headCount}
                        </a>
                      </div>
                      {/* </article> */}
                    </Card>
                  );
                })}
            </main>
            {isLoading ? (
              <div className="circularProgress">
                <CircularProgress size={50} sx={{ mt: 5, mb: 1 }} />
              </div>
            ) : null}
          </section>
          <section className="main-footer-container">
            <Footer />
          </section>
        </section>
      </StyledEntireMain>
    </>
  );
};
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
    /* border: solid black 1px; */
    /* margin-left: 30px;
    margin-right: 30px; */
    /* height: 100%; */
  }
  .cardlists-container--loading {
    margin-left: 30px;
    margin-right: 30px;
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
    /* border: black solid 1px; */
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
  .loading {
    text-align: center;
    background-color: white;
    font-size: large;
  }
  .circularProgress {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export default EntireMain;
