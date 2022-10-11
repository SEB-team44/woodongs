import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Main/Navbar";
import Footer from "../Main/Footer";
import Button from "@mui/material/Button";
import { TiTrash, TiPencil } from "react-icons/ti";

const StyledSingleBoard = styled.section`
  .container {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100vw;
  }
  .singleboard-main-container {
    width: 800px;
    height: 100%;
    margin: 30px 300px;
    border: solid black 1px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
    padding: 30px;
  }
  .singleboard-title {
    border-bottom: 1px solid black;
    height: 80px;
    font-size: 30px;
  }
  .singleboard-body {
    border-bottom: 1px solid black;
    height: 500px;
    margin-top: 20px;
  }
  .singleboard-comment {
    margin-bottom: 20px;
    border-left: black 1px solid;
    display: flex;
  }
  .singleboard-comment-box {
    margin-top: 15px;
  }
  .singleboard-input-box {
    display: flex;
  }
  /* .singleboard-comment-view-box {
    background-color: #ffdddd;
    height: 100;
  } */
  .update-btn,
  .delete-btn {
    float: right;
    cursor: pointer;
  }
  .button-container {
    height: 20px;
    margin: 5px;
  }
  .singleboard-comment-name {
    font-weight: bold;
    margin: 5px;
  }
  .singleboard-comment-content {
    margin: 5px;
  }
  .singleboard-comment-delete-btn {
    border: none;
    cursor: pointer;
  }
  .singleboard-textarea {
    width: 38vw;
  }
  .input-button {
    height: 40px;
  }
`;

const SingleBoard = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [board, setBoard] = useState([]);
  const [inputComments, setInputComments] = useState("");
  const [getcondition, setgetCondition] = useState(true);
  const [getconditions, setgetconditions] = useState(true);
  const [content, setContent] = useState(null);
  const { id } = useParams();
  const { postId } = useParams();
  const access_token = localStorage.getItem("access_token");

  //boardlist 내용 상세페이지로 가져오기
  useEffect(() => {
    function getBoardList() {
      let reqOption = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          withCredentials: true,
          "Access-Control-Allow-Origin": "*",
          Authorization: access_token,
        },
      };
      fetch(`https://api.woodongs.site/post/${id}`, reqOption)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          return data;
        })
        .then((data) => setBoard(data));
    }
    function getCommentList() {
      let reqOption = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          withCredentials: true,
          "Access-Control-Allow-Origin": "*",
          Authorization: access_token,
        },
      };
      fetch(`https://api.woodongs.site/post/${id}`, reqOption)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          return data;
        })
        .then((data) => setComments(data.commentResponseDtos));
    }
    getCommentList();
    getBoardList();
  }, [getcondition]);

  //게시판 게시물 삭제 메소드
  const handleDeleteSB = () => {
    let reqDelete = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        withCredentials: true,
        "Access-Control-Allow-Origin": "*",
        Authorization: access_token,
      },
    };
    fetch(`https://api.woodongs.site/post/${id}`, reqDelete)
      .then((res) => {
        if (res.ok) {
          alert("해당 게시물이 삭제 되었습니다 :-D");
          navigate(`/FreeBoard`);
          return res.json();
        }
        console.log(res);
        return res;
      })
      .catch((err) => console.log(err.message));
  };

  //댓글
  useEffect(() => {
    function getContent() {
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
      fetch("https://api.woodongs.site/post/" + `${id}`, reqOption)
        .then((res) => res.json())
        .then((data) => {
          console.log("댓글 입력한거 출력", data);
          return data;
        })
        .then((data) => setContent({ ...content, ...data }));
    }
    getContent();
  }, []);

  //댓글입력
  // 댓글 입력을 누르면, 그 내용을 post요청
  const postCommentDatas = () => {
    let reqPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
        "Access-Control-Allow-Origin": "*",
        Authorization: access_token,
      },
      body: JSON.stringify({
        body: inputComments,
      }),
    };
    fetch(`https://api.woodongs.site/post/${id}/comment`, reqPost)
      .then((res) => res.json())
      .then(() => {
        setgetCondition(!getcondition);
        setInputComments("");
      });
    //get요청시, 의존성 배열에 post요청시마다 리랜더링 되도록 바꿔줌.
  };

  //삭제 버튼 클릭 시, 들어온 id 값에 맞는 부분 삭제 요청 보냄
  //댓글 삭제
  const handleDeleteSBComment = (elID) => {
    fetch(`https://api.woodongs.site/post/${id}/${elID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
        "Access-Control-Allow-Origin": "*",
        Authorization: access_token,
      },
    }).then(() => {
      setgetCondition(!getcondition);
    });
  };

  //댓글 구현 메소드
  const handleSumits = (e) => {
    e.preventDefault();
    postCommentDatas();
    e.target.value = null;
  };

  const handleChangeInputs = (e) => {
    setInputComments(e.target.value);
  };

  return (
    <>
      <StyledSingleBoard>
        <section className="container">
          <section className="header-box">
            <Navbar />
          </section>
          <section className="singleboard-main-container">
            <section className="singleboard-main-container-inner">
              <div className="button-container">
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteSB(board.postId)}
                >
                  <TiTrash />
                </button>
                <button
                  className="update-btn"
                  // onClick={handleUpdateSBComment(content.postId)}
                >
                  <TiPencil />
                </button>
              </div>

              <section className="singleboard-title">
                <div>{board.title}</div>
              </section>
              <section className="singleboard-body">
                <pre>{board.body}</pre>
              </section>
            </section>
            <section className="singleboard-comment-box">
              <div className="singleboard-input-box">
                <textarea
                  className="singleboard-textarea"
                  placeholder="여기에 댓글을 입력하세요."
                  onChange={(e) => handleChangeInputs(e)}
                  value={inputComments}
                />
                <Button
                  className="input-button"
                  variant="contained"
                  onClick={(e) => handleSumits(e)}
                >
                  입력
                </Button>
              </div>
              <div className="singleboard-comment-view-box">
                {comments.map((el, idx) => {
                  return (
                    <>
                      <div key={el.commentId} className="singleboard-comment">
                        <div className="singleboard-comment-name">
                          {el.nickName}
                        </div>
                        <div className="singleboard-comment-content">
                          {el.body}
                        </div>
                        <button
                          className="singleboard-comment-delete-btn"
                          onClick={() => handleDeleteSBComment(el.commentId)}
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
      </StyledSingleBoard>
    </>
  );
};

export default SingleBoard;
