import React from "react";
import Navbar from "../Main/Navbar";
import Footer from "../Main/Footer";
import Notice from "../Main/Notice";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { UserLogin } from "../../UserContext";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

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
  }
  .freeboard-notice-container {
    margin-bottom: 30px;
  }
  .freeboard-main-container {
    /* border: solid black 1px; */
    margin: 30px;
  }
  .main-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0px auto;
    width: 1000px;
  }
  .handle-box {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;
    margin-top: 20px;
  }
  .post {
    border: #dedede 1px solid;
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
    color: white;
  }
  #filter-demo {
    padding: 1px;
  }
  .search-button {
    color: white;
  }
`;

const FreeBoard = () => {
  
  const { isLogin } = useContext(UserLogin);
  const [boardList, setBoardList] = useState([]);
  //지역검색필터
  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.title,
  });
  //필터목록
  const stateFilter = [
    { title: "서울특별시" },
    { title: "경기도" },
    { title: "충청도" },
    { title: "전라도" },
    { title: "강원도" },
    { title: "제주도" },
  ];

  // 게시판list를 요청
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    const getBoardList = async () => {
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
      fetch("http://www.woodongs.site:8080/post?size=15&cursorId=15", reqOption)
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resoure");
          }
          return res.json();
        })
        .then((data) => {
          console.log("data", data)
          setBoardList(data.data);
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
                  <Autocomplete
                    id="filter-demo"
                    options={stateFilter}
                    getOptionLabel={(option) => option.title}
                    filterOptions={filterOptions}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div className="handle-search-box">
                  <Input placeholder="Search.." />
                  <Button variant="contained" className="search-button">
                    검색
                  </Button>
                </div>
                <div>
                  {isLogin ? (
                    <Link to="/AddBoard">
                      <Button className="submit-button" variant="contained">
                        글쓰기
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/Login">
                      <Button className="submit-button" variant="contained">
                        로그인 후 글쓰기
                      </Button>
                    </Link>
                  )}
                </div>
              </section>

              <article className="post-box">
                <div className="post-list">
                  {boardList && boardList.map((el, idx) => {
                    return (
                      <div key={idx} className="post">
                        <Link to={"/SingleBoard/" + `${el.postId}`}>
                          <h1>{el.title}</h1>
                          <div>{el.body.slice(0, 180)}</div>
                        </Link>
                      </div>
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
