import { React, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../Main/Navbar";
import EditeRecruit from "./EditRecruit";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Footer from "../Main/Footer";
import Button from "@mui/material/Button";
import { UserLogin } from "../../UserContext";
import useFetch from "../useFetch";
import { TiTrash, TiPencil } from "react-icons/ti";

const StyledRecruit = styled.section`
  h1 {
    font-size: 50px;
    margin: 10px;
  }
  .recruit-container {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100vw;
  }
  .recruit-main-container {
    border: solid black 1px;
    border-radius: 50px;
    margin: 30px 300px;
    height: 100%;
    width: 1000px;
    display: flex;
    flex-direction: column;
    background-color: #f1f4f7;
  }
  .recruit-title-box {
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 20px;
  }
  .recruit-main-box {
    display: flex;
    flex-direction: row;
    border-top: solid 1px black;
    border-bottom: solid 1px black;
  }
  .recruit-main-section {
    padding: 20px;
  }
  .recruit-main-aside {
    width: 300px;
    border-left: solid 1px black;
    padding: 20px;
    text-align: center;
  }
  .my-info {
    border: solid black 1px;
    border-radius: 30px;
    background-color: #e6edfc;
    padding: 20px;

    flex-direction: row;
    justify-content: center;
  }
  .recruit-comment-box {
    padding: 20px;
  }
  .inputbox-textarea {
    width: 70vh;
  }
  .recruit-comment {
    margin-bottom: 20px;
    border-left: black 1px solid;
    display: flex;
  }
  textarea {
    resize: none;
  }
  .input-button {
    padding: 0px;
  }
  .recruit-inputbox {
    align-items: center;
    justify-content: center;
  }
  .recruit-comment-name {
    font-weight: bold;
    margin: 5px;
  }
  .recruit-comment-content {
    margin: 5px;
  }
  .recruit-comment-delete-btn {
    border: none;
  }
  .update-btn,
  .delete-btn {
    float: right;
  }
`;

const Recruit = () => {
  const navigate = useNavigate();
  const { isLogin } = useContext(UserLogin);
  const [keyword, setKeyword] = useState([]);
  //댓글리스트
  const [comment, setComment] = useState([]);
  const [card, setCard] = useState([]);
  const [inputComment, setInputComment] = useState("");
  const [getcondition, setgetcondition] = useState(true);
  const [getconditions, setgetconditions] = useState(true);

  const [recruitContent, setRecruitContent] = useState({
    // studyId: "",
    id: "",
    title: "",
    body: "",
    category: "",
    headCount: "",
  });

  //질문목록에 맞는 데이터 받아오기
  //URL 파라미터 받기 card의 id
  const { id } = useParams();
  const { studyId } = useParams(); //studyId입니다.
  const [data, setData] = useState({});
  const [content, setContent] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    function getContent() {
      let reqOption = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          withCredentials: true,
          "Access-Control-Allow-Origin": "*",
          Authorization: access_token,
        },
      };
      fetch("http://3.35.188.110:8080/study/" + `${id}`, reqOption)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          return data;
        })
        .then((data) => setContent(data));
    }
    getContent();
  }, []);

  // useEffect(() => {
  //   const getData = async () => {
  //     // const { data } = await axios.get(`/card/${id}`);
  //     const { data } = await axios.get(`/study/${studyId}`);
  //     return data;
  //   };
  //   getData()
  //     .then((result) => setData(result))
  //     .then(console.log(data))
  //     .then(() => setIsLoaded(true));
  // }, []);

  //삭제메소드
  const handledelete = () => {
    let reqDelete = {
      method: "DELETE",
    };
    console.log(id);
    console.log(studyId);
    // fetch("http://localhost:3001/card/" + `${id}`, reqDelete)
    fetch("http://3.35.188.110:8080/study/" + `${id}`, reqDelete)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.message));
    navigate(`/main`);
  };

  //카드 리스트와 댓글 리스트를 첫 랜더링 때 받아오자
  useEffect(() => {
    // const getKeywordList = async () => {
    //   // fetch("http://localhost:3001/keyword")
    //   fetch("http://3.35.188.110:8080/study")
    //     .then((res) => {
    //       if (!res.ok) {
    //         throw Error("could not fetch the data for that resource");
    //       }
    //       return res.json();
    //     })
    //     .then((data) => {
    //       setKeyword(data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };

    function getCommentList() {
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
      fetch(`http://3.35.188.110:8080/study/${id}`, reqOption)
        .then((res) => res.json())
        .then((data) => {
          console.log(data); //댓글배열로나옴
          return data;
        })
        .then((data) => setComment(data.commentResponseDtos));
    }
    // const getCommentList = async () => {
    //   // fetch("http://localhost:3001/comment")
    //   fetch(`http://3.35.188.110:8080/study/${id}/comment`)
    //     .then((res) => {
    //       if (!res.ok) {
    //         throw Error("could not fetch the data for that resource");
    //       }
    //       return res.json();
    //     })
    //     .then((data) => {
    //       console.log(data);
    //       setComment(data);
    //     });
    //   // .catch((err) => {
    //   //   console.log(err);
    //   // });
    // };

    function getCardList() {
      let reqOption = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          withCredentials: true,
          "Access-Control-Allow-Origin": "*",
          Authorization: access_token,
        },
      };
      fetch(`http://3.35.188.110:8080/study/${id}`, reqOption)
        .then((res) => res.json())
        .then((data) => {
          console.log(data); //나옴
          return data;
        })
        .then((data) => setCard(data));
    }

    getCommentList();
    getCardList();
  }, [getcondition]);

  // 댓글 입력을 누르면, 그 내용을 post요청
  const postCommentData = () => {
    const access_token = localStorage.getItem("access_token");
    let reqPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
        "Access-Control-Allow-Origin": "*",
        Authorization: access_token,
      },
      body: JSON.stringify({
        body: comment.body,
      }),
    };
    //`http://3.35.188.110:8080/study/${study-id}/comment`
    //http://localhost:3001/comment
    // fetch("http://localhost:3001/comment", reqPost).then((res) => res.json());
    fetch(`http://3.35.188.110:8080/study/${id}/comment`, reqPost).then((res) =>
      res.json()
    );
    //get요청시, 의존성 배열에 post요청시마다 리랜더링 되도록 바꿔줌.
    setgetcondition(!getcondition);
    setInputComment("");
  };
  //댓글 구현 메소드
  const handleSumit = (e) => {
    // e.preventDefault();
    postCommentData();
    e.target.value = null;
  };

  const handleChangeInput = (e) => {
    setInputComment(e.target.value);
  };

  //삭제 버튼 클릭시, 들어온 id값에 맞는 부분 삭제 요청 보냄
  const handeDeleteComment = (id) => {
    // fetch("http://localhost:3001/comment/" + `${id}`, {
    //   method: "DELETE",
    // });
    fetch(`http://3.35.188.110:8080/study/${id}/comment`, {
      method: "DELETE",
    });

    setgetcondition(!getcondition);
  };

  //게시물 삭제 버튼 클릭 시, 들어온 id값에 맞는 부분 삭제 요청 보냄
  const handleDeleteRecruit = (id) => {
    // fetch("http://localhost:3001/card/" + `${id}`, {
    //   method: "DELETE",
    // });
    fetch(`http://3.35.188.110:8080/study/${id}/comment`, {
      method: "DELETE",
    });
    setgetconditions(!getconditions);
  };
  return (
    <>
      <StyledRecruit>
        <section className="recruit-container">
          <section className="header-box">
            <Navbar />
          </section>
          {/* {card.map((el,idx)=>{
            return(
              
            )
          })} */}
          <section className="recruit-main-container">
            <section className="recruit-title-box">
              <button>스터디 네트워킹</button>
              <div className="recruit-title">
                <h1>{card.title}</h1>
              </div>
              {/* <h1>{`[서울] 인터렉티브 웹 스터디`}</h1> */}
            </section>
            <section className="recruit-main-box">
              <section className="recruit-main-section">
                <article>
                  {/* 수정업데이트 버튼
                  삭제는 리스트에서 삭제하면되나 */}
                  <div className="button-container">
                    <button
                      className="delete-btn"
                      onClick={() => handledelete()}
                    >
                      <TiTrash />
                    </button>
                    <button
                      className="update-btn"
                      // onClick={() => handleDeleteRecruit(el.id)}
                    >
                      <Link to="/study/EditRecruit">
                        <TiPencil />
                      </Link>
                    </button>
                  </div>
                  <h2>✔️ 모집현황</h2>
                  <p>프론트 엔드 스터디원 0/{card.headCount}</p>
                </article>
                <article>
                  <h2>✔️ 스터디 키워드</h2>
                  <div className="keywords-box">
                    {card.category}
                    {keyword.map((el, idx) => {
                      return (
                        <>
                          <button id={idx}>{el}</button>
                        </>
                      );
                    })}
                  </div>
                </article>
                <article>
                  <h2>✔️ 소개</h2>
                  <p>{card.body}</p>
                </article>
              </section>
              <aside className="recruit-main-aside">
                <article>
                  <h2>리더정보</h2>
                  <div className="my-info">
                    <img
                      className="avatarimg"
                      src={require("../../../src/img/avatar.png")}
                    />
                    <p>Choi</p>
                  </div>
                </article>
                <article className="innertext">
                  <h2>-스터디 기간</h2>
                  <p>22.09.02 ~23.03.02</p>
                </article>
                <article className="innertext">
                  <h2>-스터디 분야</h2>
                  <p>{card.category}</p>
                </article>
                {isLogin ? (
                  <article>
                    <Button className="submit-button" variant="contained">
                      신청하기
                    </Button>
                  </article>
                ) : null}
              </aside>
            </section>
            <section className="recruit-comment-box">
              <div className="recruit-inputbox">
                <textarea
                  className="inputbox-textarea"
                  placeholder="여기에 댓글을 입력하세요."
                  onChange={(e) => handleChangeInput(e)}
                  value={inputComment}
                />
                <Button
                  className="input-button"
                  variant="contained"
                  onClick={(e) => handleSumit(e)}
                >
                  입력
                </Button>
              </div>
              <div className="recruit-commentbox">
                {comment.map((el, idx) => {
                  return (
                    <>
                      <div key={el.id} className="recruit-comment">
                        <div className="recruit-comment-name">{el.name}</div>
                        <div className="recruit-comment-content">{el.body}</div>
                        <button
                          className="recruit-comment-delete-btn"
                          onClick={() => handeDeleteComment(el.id)}
                        >
                          ✖️ 삭제
                        </button>
                      </div>
                    </>
                  );
                })}
              </div>
            </section>
          </section>
          <section className="footer-box">
            <Footer />
          </section>
        </section>
      </StyledRecruit>
    </>
  );
};

export default Recruit;
