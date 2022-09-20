import React from "react";
import Navbar from "../Main/Navbar";
import styled from "styled-components";
import { useState, useEffect } from "react";

const StyledRecruit = styled.div`
  .recruit-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    /* height: 100%; */
    width: 100vw;
    border: solid black 1px;
  }
  .recruit-main-container {
    border: solid black 1px;
    margin-left: 30px;
    margin-right: 30px;
    padding-left: 50px;
    padding-right: 50px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f1f4f7;
    /* height: 100%; */
  }
  .recruit-title-box {
    border: solid 1px black;
    align-items: center;
    text-align: center;
    height: 300px;
  }
  .recruit-main-box {
    display: flex;
    flex-direction: row;
    border: solid 1px black;
  }
  .recruit-main-section {
    padding-right: 70px;
  }
  .recruit-main-aside {
    width: 300px;
    border: solid 1px black;
    padding: 20px;
  }
  .my-info {
    display: flex;
    flex-direction: row;
  }
  .recruit-comment-box {
    border: 1px solid black;
    padding-bottom: 50px;
    padding-top: 20px;
  }
  .inputbox-textarea {
    width: 70%;
  }
  .recruit-comment{
    margin-bottom: 20px;
  }
`;

const Recruit = () => {
  const [keyword, setKeyword] = useState([]);
  const [comment, setComment] = useState([]);
  const [inputComment, setInputComment] = useState("");
  const [getcondition, setgetcontition] = useState(true);

  //카드 리스트와 댓글 리스트를 첫 랜더링 때 받아오자  
  useEffect(() => {
    const getCardList = async () => {
      fetch("http://localhost:3001/keyword")
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setKeyword(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const getCommentList = async () => {
      fetch("http://localhost:3001/comment")
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setComment(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCardList();
    getCommentList();
  }, [getcondition]);

  // 댓글 입력을 누르면, 그 내용을 post요청
  const postCommentData = () => {
      let reqPost = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "김영하",
          content: inputComment,
        }),
      }
      fetch('http://localhost:3001/comment', reqPost)
      .then(res => res.json())
      
      //get요청시, 의존성 배열에 post요청시마다 리랜더링 되도록 바꿔줌.
      setgetcontition(!getcondition);
      setInputComment('');
  }



  const handleSumit = (e) => {
      e.preventDefault();
      postCommentData()
      e.target.value = null
  }

  const handleChangeInput = (e) => {
    setInputComment(e.target.value);
  }

  //삭제 버튼 클릭시, 들어온 id값에 맞는 부분 삭제 요청 보냄 
  const handeDeleteComment = (id) => {
    fetch('http://localhost:3001/comment' + `/${id}`, {
      method: "DELETE"
    })

    setgetcontition(!getcondition);
  }
  return (
    <>
      <StyledRecruit>
        <section className="recruit-container">
          <section className="header-box">
            <Navbar />
          </section>
          <section className="recruit-main-container">
            <section className="recruit-title-box">
              <button>스터디 네트워킹</button>
              <h1>{`[서울] 인터렉티브 웹 스터디`}</h1>
              <div>
                <div className="my-info">
                  <button>내 사진</button>
                  <p>이름</p>
                </div>
              </div>
            </section>
            <section className="recruit-main-box">
              <section className="recruit-main-section">
                <article>
                  <h2>-모집현황</h2>
                  <p>프론트 엔드 스터디원 0/3</p>
                </article>
                <article>
                  <h2>-스터디 키워드</h2>
                  <div className="keywords-box">
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
                  <h2>-소개</h2>
                  <p>
                    ● 스터디 목표 및 진행방식 [목표] : 인터렉티브 웹 스터디
                    웹3.0 시대에 적절한 예술 전시 형태가 무엇일까요? <br></br>
                    오늘날 미술관에서 빠르게 변화하는 미디어에 대응해 다양한
                    방면(아카이빙, 온라인 전시, 가상 전시 등)으로 전시 형태를
                    실험하고 있습니다.<br></br> 그러나 아직까지 심도 있는 작품
                    경험을 할 수 있는 온라인 기반 전시 공간은 많지 않다고
                    생각합니다. <br></br>인터렉티브 및 3D공간 구현에 초점을 맞춰
                    함께 토론하고 적절한 기술을 공부해나가고자 하는 분들이
                    계시다면 함께 성장해가고 싶습니다 <br></br>
                    <br></br>
                    <br></br> [진행방식] <br></br>1. 개인 - 자율 스터디 *각자
                    분야 스터디 플랜 , 목표 공유 <br></br>2. 공통 - 인터렉티브
                    웹 및 도입 가능한 기술 리서치 <br></br>3. 프로토타입 제작
                    매달 프로토타입 1개 제작을 목표로 진행합니다. <br></br>
                    <br></br>[장소/횟수] 1주일에 1번 대면 모임을 갖고 필요에
                    따라 비대면 모임을 진행합니다.<br></br>
                    온라인은 줌을 활용하고, 오프라인은 서울 내 공간을 대관할
                    예정입니다.<br></br>
                    <br></br> [기간] 최소 3개월 생각하고 있습니다. <br></br>
                    <br></br>
                    <br></br>● 참여 조건 각 분야에 전문가는 아니어도 상관
                    없습니다. <br></br>예술을 좋아하고 공부하고자 하는 의지가
                    있는 분들은 모두 환영입니다.<br></br>
                    <br></br>
                    [기타] 추후 기관과 협업해 실제 전시를 구현해보고자 하며
                    온오프라인 통합 공간 설계 또한 장기적으로 생각하고 있습니다.
                    <br></br>
                    관심이 있으신 분의 많은 참여 부탁드립니다.
                  </p>
                </article>
              </section>
              <aside className="recruit-main-aside">
                <article>
                  <h2>-리더정보</h2>
                  <div className="my-info">
                    <button>내 사진</button>
                    <p>이름</p>
                  </div>
                </article>
                <article>
                  <h2>-스터디 기간</h2>
                  <p>22.09.02 ~23.03.02</p>
                </article>
                <article>
                  <h2>-스터디 분야</h2>
                  <p>웹 개발 스터디</p>
                </article>
                <article>
                  <button>신청하기</button>
                </article>
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
                <button onClick = {e => handleSumit(e)}>입력</button>
              </div>
              <div className="recruit-commentbox">
                {comment.map((el, idx) => {
                  return (
                    <>
                      <div id={el.id} className="recruit-comment">
                        <div className="recruit-comment-name">{el.name}</div>
                        <div className="recruit-comment-content">
                          {el.content}
                        </div>
                        <div className="recruit-comment-delete-btn" onClick={() => handeDeleteComment(el.id)} >X</div>
                      </div>
                    </>
                  );
                })}
              </div>
            </section>
          </section>
        </section>
      </StyledRecruit>
    </>
  );
};

export default Recruit;
