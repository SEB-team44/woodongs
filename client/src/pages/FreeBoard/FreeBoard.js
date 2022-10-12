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
    margin: 20px;
  }
  .post {
    text-align: center;
    margin: 30px;
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
  .search-button {
    color: white;
  }
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul.pagination li {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }

  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }

  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }

  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }

  ul.pagination li.active a {
    color: white;
  }

  ul.pagination li.active {
    background-color: #337ab7;
  }

  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }

  .page-selection {
    width: 48px;
    height: 30px;
    color: #337ab7;
  }
  .post-list {
    /* border: #337ab7 solid 1px; */
  }
  .thead {
    background-color: #dedede;
  }
  a {
    text-decoration: none;
    list-style: none;
    color: black;
  }
  tr {
    height: 40px;
  }
`;

const FreeBoard = () => {
  const access_token = localStorage.getItem("access_token");
  const { isLogin } = useContext(UserLogin);
  const [boardList, setBoardList] = useState([]);
  const [searchOp, setSearchOp] = useState("제목");
  const [searchInput, setSearchInput] = useState("");
  const [reRender, setRerender] = useState(false);
  const [size, setSize] = useState(10);
  const [cursor, setCursor] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);

  //검색필터링
  const handleSearchOption = (e) => {
    setSearchOp(() => e.target.value);
  };
  //검색창 input
  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchInput(() => e.target.value);
  };
  //검색버튼
  const handleInputSubmit = (e) => {
    console.log(searchOp);
    if (searchOp === "제목") {
      let filtered = boardList.filter((el) => {
        return el.title.includes(searchInput);
      });
      setBoardList([...filtered]);
    }
    if (searchOp === "내용") {
      let filtered = boardList.filter((el) => {
        return el.body.includes(searchInput);
      });
      setBoardList([...filtered]);
    }
  };
  const Time = () => {
    let today = new Date();
    let time = {
      year: today.getFullYear(), //현재 년도
      month: today.getMonth() + 1, //현재 월
      data: today.getData(), //현재 날짜
      hours: today.getHours(), //현재시간
      minutes: today.getMinutes(), //현재 분
    };
    let timestring = `${time.year}/${time.month}/${time.date} ${time.hours}:${time.minutes}`;
  };
  // 게시판list를 요청
  function getBoardList() {
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
      url = `https://api.woodongs.site/post?size=5&cursorId=${cursor}`;
    } else {
      url = `https://api.woodongs.site/post?size=10&cursorId=500`;
    }
    if (!isAvailable) {
      return;
    }
    fetch(url, reqOption)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .then((data) => {
        setBoardList([...boardList, ...data.data]);
        console.log(data.sliceInfo);
        if (data.sliceInfo.nextAvailable) {
          setCursor(data.sliceInfo.lastIdx);
          console.log(data.sliceInfo.lastIdx, cursor, boardList);
        } else {
          setIsAvailable(false);
        }
      });
  }
  useEffect(() => {
    getBoardList();
  }, [reRender]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight) {
        getBoardList();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  const createTime = () => {
    let today = new Date();
    let year = today.getFullYear(); //현재 년도
    let month = today.getMonth() + 1; //현재 월
    let data = today.getData(); //현재 날짜
    let hours = today.getHours(); //현재시간
    let minutes = today.getMinutes(); //현재 분
    return year + "." + month + "." + hours + ":" + minutes;
  };
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
                <div className="handle-search-box">
                  <select onChange={(e) => handleSearchOption(e)}>
                    <option value="제목">제목</option>
                    <option value="내용">내용</option>
                  </select>
                  <Input
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Search.."
                    value={searchInput}
                  />
                  <Button
                    onClick={(e) => handleInputSubmit(e)}
                    variant="contained"
                    className="search-button"
                  >
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
                  <table>
                    <thead className="thead">
                      <tr>
                        <td width="10%">번호</td>
                        <td width="60%">제목</td>
                        <td width="20%">작성자</td>
                        <td width="20%">작성일</td>
                      </tr>
                    </thead>
                    {boardList &&
                      boardList.map((el, idx) => {
                        return (
                          <tbody key={idx} className="post">
                            <tr className="tr">
                              <td className="el">{el.postId}</td>
                              <td>
                                <Link to={"/SingleBoard/" + `${el.postId}`}>
                                  {el.title}
                                </Link>
                              </td>
                              <td>{el.memberResponseDto.nickName}</td>
                              {/* <td>{el.createdAt}</td> */}
                              <td>{el.createdAt.slice(0, 10)}</td>
                            </tr>
                          </tbody>
                        );
                      })}
                  </table>
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
