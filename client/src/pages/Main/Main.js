import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Notice from "./Notice";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const StyledMain = styled.div`
  .main-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100vw;
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
    background-color: #f1f4f7;
    /* justify-content: */
    /* margin-left: 10%; */
  }
  .cardlist {
    height: 500px;
    width: 400px;
    border: black solid 1px;
    margin-bottom: 80px;
    border-radius: 5%;
    margin-left: 4%;
    background-color: white;
  }
  .cardlist :nth-child(1) {
    margin-bottom: 10px;
  }
  .cardimg {
    width: 100%;
    border-top-left-radius: 5%;
    border-top-right-radius: 5%;
  }
  .study-info-box {
    display: flex;
    flex-direction: column;
  }
  .study-info-header {
    color: black !important;
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

  .study-info-header {
    font-size: 1.5rem;
  }
`;

const Main = ({ list, totall }) => {
  const [cardList, setCardList] = useState([]);

  const obsRef = useRef(null); //observer Element
  // const [list, setList] = useState(() => list); //post List
  const [page, setPage] = useState(1); //현재 페이지
  const [load, setLoad] = useState(false); //로딩 스피너
  const preventRef = useRef(true); //옵저버 중복 실행 방지
  const endRef = useRef(false); //모든 글 로드 확인

  useEffect(() => {
    //옵저버 생성
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    getPost();
  }, [page]);

  const obsHandler = (entries) => {
    //옵저버 콜백함수
    const target = entries[0];
    if (!endRef.current && target.isIntersecting && preventRef.current) {
      //옵저버 중복실행방지
      preventRef.current = false; //옵저버 중복실행 방지
      setPage((prev) => prev + 1); //페이지 값 증가
    }
  };

  const getPost = useCallback(async () => {
    //글 불러오기
    setLoad(true); //로딩 시작
  });

  // cardList를 요청
  useEffect(() => {
    const getCardList = async () => {
      fetch("http://localhost:3001/card")
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setCardList(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCardList();
  }, []);

  return (
    <>
      <StyledMain>
        <section className="main-container">
          <section className="main-nav-container">
            <Navbar />
          </section>

          <section className="main-notice-container">
            <Notice />
          </section>

          <section className="main-cardlist-container">
            <main className="cardlists-box">
              {cardList.map((el, idx) => {
                return (
                  <article className="cardlist" key={idx}>
                    <div className="cardimg-box">
                      <img
                        className="cardimg"
                        src={require("../../../src/img/businessplan.png")}
                      ></img>
                    </div>
                    <div className="study-info-box">
                      <header className="study-info study-info-header">
                        <Link to="/recruit">{el.title}</Link>
                      </header>
                      <a className="study-info">{el.content}</a>
                      <ol className="study-info tags">
                        <li>#JS</li>
                        <li>#React</li>
                        <li>#CSS</li>
                      </ol>
                    </div>
                    <div className="">
                      <a>모집완료 0/3</a>
                      {/* <div ref={observer} />
                      <>{isLoading && <Loading />}</> */}
                    </div>
                  </article>
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
