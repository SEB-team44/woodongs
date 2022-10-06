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
import Paginations from "../Main/Paginations";
import { Construction } from "@mui/icons-material";
import axios from "axios";
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
  const { isLogin } = useContext(UserLogin);
  const [boardList, setBoardList] = useState([]);
  const [searchOp, setSearchOp] = useState("제목");
  const [searchInput, setSearchInput] = useState("");
  //페이지네이션
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  // const [limit, setLimit] = useState(10);
  // const [page, setPage] = useState(1);
  // const offset = (page - 1) * limit;
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

  // 게시판list를 요청
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    const getBoardList = async () => {
      setLoading(true);
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
      fetch("https://woodongs.site/post?size=50&cursorId=100", reqOption)
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resoure");
          }
          return res.json();
        })
        .then((data) => {
          console.log("data", data);
          setBoardList(data.data);
          setPosts(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBoardList();
  }, []);
  console.log(posts);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
  //페이지네이션
  // const changePage = (page) => {
  //   setPage(page);
  //   setBoardList(page);
  // };

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
                        <td width="50%">제목</td>
                        <td width="20%">작성자</td>
                        <td width="20%">작성일</td>
                      </tr>
                    </thead>
                    {boardList &&
                      boardList.map((el, idx) => {
                        // boardList.slice(offset, offset + limit).map((el, idx) => {
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
                              <td>{el.createdAt}</td>
                            </tr>
                          </tbody>
                        );
                      })}
                  </table>
                </div>
              </article>
              {/* <Posts posts = {currentPosts(posts)}loading = {loding}></Posts> */}
              {/* <Paginations
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={setCurrentPage}
              ></Paginations> */}
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
