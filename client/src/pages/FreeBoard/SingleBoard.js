import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Main/Navbar";
import Footer from "../Main/Footer";
import Button from "@mui/material/Button";

const StyledSingleBoard = styled.section`
  .singleboard-main-container {
    height: 100vh;
    width: 800px;
    margin: 50px;
    background-color: beige;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 50px;
    padding: 50px;
  }
  .singleboard-title {
    border: 1px solid black;
    height: 20px;
  }
  .singleboard-body {
    border: 1px solid black;
  }
  .singleboard-tag {
    border: 1px solid black;
  }
  .singleboard-comment-box {
    border: 1px solid black;
  }
  .singleboard-input-box {
    border: 1px solid black;
  }
  .singleboard-comment-view-box {
    background-color: #ffdddd;
    height: 100px;
  }
`;

const SingleBoard = () => {
  const [comments, setComments] = useState([]);
  const [inputComments, setInputComments] = useState("");
  const [getconditions, setgetconditions] = useState(true);
  const [getSingleBoard, setGetSingleBoard] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getBoardList = async () => {
      fetch("http://localhost:3001/board/" + `${id}`)
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setGetSingleBoard(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBoardList();
  }, [getSingleBoard, id]);

  // 댓글 입력을 누르면, 그 내용을 post요청
  const postCommentDatas = () => {
    let reqPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "김영하",
        content: inputComments,
      }),
    };
    fetch("http://localhost:3001/boardcomment", reqPost).then((res) =>
      res.json()
    );

    //get요청시, 의존성 배열에 post요청시마다 리랜더링 되도록 바꿔줌.
    setgetconditions(!getconditions);
    setInputComments("");
  };

  const handleSumits = (e) => {
    e.preventDefault();
    postCommentDatas();
    e.target.value = null;
  };

  const handleChangeInputs = (e) => {
    setInputComments(e.target.value);
  };

  //삭제 버튼 클릭 시, 들어온 id 값에 맞는 부분 삭제 요청 보냄
  const handleDeleteSBComment = (id) => {
    fetch("http://localhost:3001/boardcomment/" + `${id}`, {
      method: "DELETE",
    });
    setgetconditions(!getSingleBoard);
  };
  return (
    <>
      <StyledSingleBoard>
        <section className="container">
          <section className="header-box">
            <Navbar />
          </section>
          <section className="singleboard-main-container">
            <section className="singleboard-title">
              <div>제목: {getSingleBoard.title}</div>
            </section>
            <section className="singleboard-body">
              <div>내용: {getSingleBoard.body}</div>
            </section>
            <section className="singleboard-tag">
              <div>지역: {getSingleBoard.tag}</div>
            </section>
            <section className="singleboard-comment-box">
              <div className="singleboard-input-box">
                <textarea
                  className="singleboard-textarea"
                  placeholder="여기에 댓글을 입력하세요."
                  value={inputComments}
                  onChange={(e) => handleChangeInputs(e)}
                />
                <Button
                  className="input-button"
                  variant="contained"
                  onclick={(e) => handleSumits(e)}
                >
                  입력
                </Button>
              </div>
              <div className="singleboard-comment-view-box">
                {comments.map((el, idx) => {
                  return (
                    <>
                      <div key={el.id} className="singleboard-comment">
                        <div className="singleboard-comment-name">
                          {el.name}
                        </div>
                        <div className="singleboard-comment-content">
                          {el.content}
                        </div>
                        <button
                          className="singleboard-comment-delete-btn"
                          onClick={() => handleDeleteSBComment(el.id)}
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
          <Footer />
        </section>
      </StyledSingleBoard>
    </>
  );
};

export default SingleBoard;
