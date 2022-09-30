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
import Pagination from "../Main/Pagination";

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
  ul {
    list-style: none;
  }
`;

const FreeBoard = () => {
  const { isLogin } = useContext(UserLogin);
  const [boardList, setBoardList] = useState([]);
  const [searchOp, setSearchOp] = useState("제목");
  const [searchInput, setSearchInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);
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
      // fetch("https://jsonplaceholder.typicode.com/posts", reqOption)
      fetch("http://3.35.188.110:8080/post", reqOption)
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setBoardList(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBoardList();
  }, []);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
  // //무한스크롤관련
  // const [item, setItem] = useState([]);
  // const [target, setTarget] = useState(null);
  // const page = 10;

  // const fetchData = async () => {
  //   let reqOption = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       withCredentials: true,
  //       "Access-Control-Allow-Origin": "*",
  //       Authorization: access_token,
  //     },
  //   };
  //   fetch(`http://3.35.188.110:8080/post`, reqOption)
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw Error("Couldn't fetch the data for that resource");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       // page++;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
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

  // let count = 0;
  // window.onscroll = function (e) {
  //   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //     count++;
  //     let addContent =
  //       // document.createElement("div");
  //       // addContent.classList.add("box");

  //       '<div class="block"><p>' + count + "번째로 추가된 컨텐츠</p></div>";
  //     document.querySelector("article").append(addContent);
  //   }
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
                  {boardList.map((el, idx) => {
                    return (
                      <>
                        <ul>
                          <li key={idx} className="post">
                            <Link to={"/SingleBoard/" + `${el.postId}`}>
                              <h1>{el.title}</h1>
                              <div>{el.body.slice(0, 180)}</div>
                            </Link>
                          </li>
                        </ul>
                      </>
                    );
                  })}
                </div>
              </article>
              <Pagination>
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate = {setCurrentPage}
              </Pagination>
            </main>
          </section>
          {/* <div ref={setTarget}>this is target</div> */}

          <section className="freeboard-footer-container">
            <Footer />
          </section>
        </section>
      </StyledFreeBoard>
    </>
  );
};

export default FreeBoard;
