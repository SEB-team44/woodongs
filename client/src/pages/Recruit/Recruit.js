import { React, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../Main/Navbar";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Footer from "../Main/Footer";
import Button from "@mui/material/Button";
import { UserInfo, UserLogin } from "../../UserContext";
import { TiTrash, TiPencil } from "react-icons/ti";
import Manage from "./Manage";
import SockJS from "sockjs-client";
import StompJs from "stompjs";

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
    border-radius: 2%;
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
    width: 70%;
  }
  .recruit-main-aside {
    width: 30%;
    border-left: solid 1px black;
    padding: 20px;
    text-align: center;
  }
  .tab {
    display: flex;
    flex-direction: row;
    border-bottom: 1px black solid;
  }
  .tab-element {
    padding-left: 15px;
    padding-right: 15px;
   
  }
  .tab-element:hover{
    background-color:#E5EDFC;
    font-weight: 600;
  }
  #tab-checked{
    background-color:#E5EDFC;
    font-weight: 600;
    border-top: solid black 1px;
    border-right : solid black 1px;
    border-left: 1px black solid;
  }
  .my-info {
    border: solid black 1px;
    border-radius: 5%;
    background-color: #e6edfc;
    padding: 20px;
    flex-direction: row;
    justify-content: center;
  }
  .recruit-comment-box {
    padding: 20px;
  }
  .inputbox-textarea {
    width: 900px;
    margin-bottom: 20px;
  }
  .recruit-comment {
    margin-bottom: 20px;
    border-left: black 1px solid;
    display: flex;
  }
  textarea {
    resize: none;
  }
  .recruit-inputbox {
    /* align-items: center;
    justify-content: center; */
    display: flex;
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
  .avatarimg {
    width: 125px;
    height: 125px;
    border-radius: 50%;
  }
  .input-button {
    height: 40px;
  }

`;

const Recruit = () => {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserInfo);
  const { isLogin } = useContext(UserLogin);
  const [keyword, setKeyword] = useState([]);
  //댓글리스트
  const [comment, setComment] = useState([]);
  const [card, setCard] = useState([]);
  const [inputComment, setInputComment] = useState("");
  const [getcondition, setgetcondition] = useState(true);
  const [changeTab, setChangeTab] = useState(true);

  //질문목록에 맞는 데이터 받아오기
  //URL 파라미터 받기 card의 id
  const { id } = useParams();
  const [content, setContent] = useState(null);

  const [tabIndex , setTabindex] = useState(0);


  
  const header = {
    "content-type": "application/json",
    Accept: "application/json",
    credential: "include",
    Authorization: localStorage.getItem("access_token"),
  };

  // recruit 페이지 나오자 마자 연결
  let socketJs = new SockJS("https://api.woodongs.site/ws-stomp");
  const stomp = StompJs.over(socketJs);

  //댓글
  useEffect(() => {
    const getContent = () => {
      let reqOption = {
        method: "GET",
        headers: header,
      };
      fetch("https://api.woodongs.site/study/" + `${id}`, reqOption)
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .then((data) => setContent({ ...content, ...data }));
    };
    getContent();
  }, []);

  //삭제메소드
  const handleDeleteRecruit = () => {
    let reqDelete = {
      method: "DELETE",
      headers: header,
    };

  
    fetch("https://api.woodongs.site/study/" + `${id}`, reqDelete)
      .then((res) => {
        if (res.ok) {
          alert("해당 스터디가 삭제 되었습니다.");
          navigate(`/main`);
          return res.json();
        }
        return res;
      })
      .catch((err) => alert(err.message));
  };

  //카드 리스트와 댓글 리스트를 첫 랜더링 때 받아오자
  useEffect(() => {
    function getCommentList() {
      let reqOption = {
        method: "GET",
        headers: header,
      };
      fetch(`https://api.woodongs.site/study/${id}`, reqOption)
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .then((data) => setComment(data.commentResponseDtos));
    }

    function getCardList() {
      let reqOption = {
        method: "GET",
        headers: header,
      };
      fetch(`https://api.woodongs.site/study/${id}`, reqOption)
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .then((data) => setCard(data));
    }

    getCommentList();
    getCardList();
  }, [getcondition]);

  // 댓글 입력을 누르면, 그 내용을 post요청
  const postCommentData = () => {
    let reqPost = {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        body: inputComment,
      }),
    };

    fetch(`https://api.woodongs.site/study/${id}/comment`, reqPost)
      .then((res) => res.json())
      .then(() => {
        setgetcondition(!getcondition);
        setInputComment("");
      });
    //get요청시, 의존성 배열에 post요청시마다 리랜더링 되도록 바꿔줌.
  };

  const handleChangeTab = (e , index) => {
    e.preventDefault();
    if (e.target.className === "tab-element tab-info") {
      setChangeTab(true);
    }
    if (e.target.className === "tab-element tab-manage") {
      setChangeTab(false);
    }
    setTabindex(index)
  };

  //댓글 구현 메소드
  const handleSumit = (e) => {
    postCommentData();
    e.target.value = null;
  };

  const handleChangeInput = (e) => {
    setInputComment(e.target.value);
  };

  //삭제 버튼 클릭시, 들어온 id값에 맞는 부분 삭제 요청 보냄
  const handeDeleteComment = (elID) => {
    fetch(`https://api.woodongs.site/study/${id}/${elID}`, {
      method: "DELETE",
      headers: header,
    }).then(() => {
      setgetcondition(!getcondition);
    });
  };
  //수정
  const handleEditRecruit = () => {
    fetch(`https://api.woodongs.site/study/${id}`, {
      method: "PATCH",
    });
    setgetcondition(!getcondition);
  };

  //신청하기 클릭시 동작하는 메서드
  const handleApplyStudy = (memberid, id) => {
    let msg = {
      senderId: Number(userInfo.memberId),
      senderNickname: userInfo.nickName,
      receiverId: Number(memberid),
      message: `${userInfo.nickName} 님께서 스터디 가입을 신청하였습니다.`,
    };
    let isError = true ;
    fetch(`https://api.woodongs.site/study/${id}/apply`, {
      method: "POST",
      headers: header,
    })
      .then((res) => {
        if (res.ok) {
          alert("신청을 성공하였습니다.");
        } 
        if (res.status === 500) {
          alert("스터디 허용 인원을 초과하였습니다.")
          isError(false)
        } 
      })
      .then(() => {
        if(isError){
          stomp.send(
            //알람 전송
            `/app/alarm`,
            {},
            JSON.stringify(msg)
          );
        }
      })
      .then(() => {
        stomp.disconnect();
      })
      .catch((error) => alert(error));
  };

  return (
    <>
      <StyledRecruit>
        <section className="recruit-container">
          <section className="header-box">
            <Navbar />
          </section>

          <section className="recruit-main-container">
            <section className="recruit-title-box">
              <div className="recruit-title">
                <h1>{card.title}</h1>
              </div>
            </section>
            <section className="recruit-main-box">
              <section className="recruit-main-section">
                <div className="tab">
                  <div
                    id={tabIndex === 0 ? "tab-checked" : null }
                    className="tab-element tab-info"
                    onClick={(e) => handleChangeTab(e, 0)}
                  >
                    정보
                  </div>
                  <div
                  id={tabIndex === 1 ? "tab-checked" : null }
                    className="tab-element tab-manage"
                    onClick={(e) => handleChangeTab(e, 1)}
                  >
                    관리
                  </div>
                </div>
                {changeTab ? (
                  <section className="tab-page">
                    <article>
                      <div className="button-container">
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteRecruit(card.studyId)}
                        >
                          <TiTrash />
                        </button>
                        <Link to={"/EditRecruit/" + `${id}`}>
                          <button
                            className="update-btn"
                          >
                            <TiPencil />
                          </button>
                        </Link>
                      </div>
                      <h2>✔️ 모집현황</h2>
                      <p>
                        {card.category} {card.nowHeadCount}/{card.headCount}
                      </p>
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
                      <pre>{card.body}</pre>
                    </article>
                  </section>
                ) : (
                  <Manage id={id} />
                )}
              </section>
              <aside className="recruit-main-aside">
                <article>
                  <h2>리더정보</h2>
                  <div className="my-info">
                    {content &&
                      content.memberResponseDtos.map((el) => {
                        if (content.createdBy === el.memberId) {
                          return (
                            <>
                              {el.profileImageUrl ? (
                                <img
                                  className="avatarimg"
                                  src={el.profileImageUrl}
                                />
                              ) : (
                                <img
                                  className="avatarImg"
                                  src={require("../../../src/img/avatar.png")}
                                />
                              )}

                              {<h2 key={el.memberId}>{el.nickName}</h2>}
                            </>
                          );
                        }
                      })}
                  </div>
                </article>
                <article className="innertext">
                  <h2>-모집 기간</h2>
                  <p>22.10.07 ~23.11.07</p>
                </article>
                <article className="innertext">
                  <h2>-스터디 분야</h2>
                  <p>{card.category}</p>
                </article>
                {isLogin ? (
                  <article>
                    <Button
                      className="submit-button"
                      variant="contained"
                      onClick={(e) =>
                        handleApplyStudy(
                          content.memberResponseDtos[0].memberId,
                          content.studyId
                        )
                      }
                    >
                      신청하기
                    </Button>
                  </article>
                ) : null}
              </aside>
            </section>{" "}
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
                      <div key={el.commentId} className="recruit-comment">
                        <div className="recruit-comment-name">
                          {el.nickName}
                        </div>
                        <div className="recruit-comment-content">{el.body}</div>
                        <button
                          className="recruit-comment-delete-btn"
                          onClick={() => handeDeleteComment(el.commentId)}
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
