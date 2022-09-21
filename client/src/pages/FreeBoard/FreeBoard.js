import React from "react";
import Navbar from "../Main/Navbar";
import Footer from "../Main/Footer";
import Notice from "../Main/Notice";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { UserLogin } from "../../UserContext";

const StyledFreeBoard = styled.section`
  .freeborad-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100vw;
    border: solid black 1px;
  }
  .freeboard-nav-container {
    margin-bottom: 50px;
    height: 63.5px;
  }
  .freeboard-notice-container {
    margin-bottom: 30px;
  }
  .freeboard-main-container {
    border: solid black 1px;
    margin-left: 30px;
    margin-right: 30px;
    /* height: 100%; */
  }
  .main-box {
    display: flex;
    flex-direction: column;
    background-color: #f1f4f7;
    justify-content: center;
    text-align: center;
    /* margin-left: 10%; */
  }
  .handle-box {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;
    border: black 1px solid;
  }
  .post {
    border: black 1px solid;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  textarea {
    resize: none;
  }
  .handle-search-box {
    display: flex;
    flex-direction: row;
  }
  .handle-search-bar {
    height: 60%;
  }
  .submit-button {
    background-color: #6787f6;
    color: white;
  }
`;

const FreeBoard = () => {
  const { isLogin } = useContext(UserLogin);
  const [boardList, setBoardList] = useState([]);

  // cardList를 요청
  useEffect(() => {
    const getBoardList = async () => {
      fetch("http://localhost:3001/board")
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setBoardList(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBoardList();
  }, []);

  return (
    <>
      <StyledFreeBoard>
        <section className="freeboard-container">
          <section className="freeboard-nav-container">
            <Navbar />
          </section>
          <section className="freeboard-notice-container">
            <Notice />
          </section>
          <section className="freeboard-main-container">
            <main className="main-box">
              <section className="handle-box">
                <div>
                  <p>지역필터</p>
                </div>
                <div className="handle-search-box">
                  <textarea className="handle-search-bar" />
                  <p>검색</p>
                </div>
                <div>
                  {isLogin ? (
                    <Link to="/AddBoard">
                      <Button className="submit-button" varient="outlined">
                        글쓰기
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/Login">
                      <Button className="submit-button" varient="outlined">
                        로그인 후 글쓰기
                      </Button>
                    </Link>
                  )}
                </div>
              </section>

              <article className="post-box">
                <div className="post-list">
                  {boardList.map((el, idx) => {
                    return (
                      <>
                        <div key={idx} className="post">
                          <div>{`#[${el.tag}]`}</div>
                          <Link to={"/SingleBoard/" + `${el.id}`}>
                            <h1>{el.title}</h1>
                          </Link>
                          <body>{el.body}</body>
                        </div>
                      </>
                    );
                  })}
                </div>
              </article>
            </main>
          </section>
          <section className="freeboard-footer-container">
            <Footer />
          </section>
        </section>
      </StyledFreeBoard>
    </>
  );
};

export default FreeBoard;
