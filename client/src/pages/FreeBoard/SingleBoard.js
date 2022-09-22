import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Main/Navbar";
import Button from "@mui/material/Button";

const StyledSingleBoard = styled.section`
  .singleboard-main-container {
    height: 80vh;
    width: 80vw;
    margin-top: 5%;
    margin-left: 5%;
    border: 1px solid black;
  }
`;

const SingleBoard = () => {
  const [comment, setComment] = useState([]);
  const [inputComment, setInputComment] = useState("");
  const [getcondition, setgetcontition] = useState(true);
  const [getSingleBoard, setGetSingleBoard] = useState({});
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
  const postCommentData = () => {
    let reqPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "김영하",
        content: inputComment,
      }),
    };
    fetch("http://localhost:3001/boardcomment", reqPost).then((res) =>
      res.json()
    );

    //get요청시, 의존성 배열에 post요청시마다 리랜더링 되도록 바꿔줌.
    setgetcontition(!getcondition);
    setInputComment("");
  };

  const handleSumit = (e) => {
    e.preventDefault();
    postCommentData();
    e.target.value = null;
  };

  const handleChangeInput = (e) => {
    setInputComment(e.target.value);
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
                  value={inputComment}
                  onChange={(e) => handleChangeInput(e)}
                />
                <Button
                  className="input-button"
                  variant="contained"
                  onclick={(e) => handleSumit(e)}
                >
                  입력
                </Button>
              </div>
              <div className="singleboard-commentbox">
                {comment.map((el, idx) => {
                  return (
                    <>
                      <div key={el.id} className="singleboard-comment">
                        <div className="singleboard-comment-name">
                          {el.name}
                        </div>
                        <div className="singleboard-comment-content">
                          {el.content}
                        </div>
                      </div>
                    </>
                  );
                })}

                <div>댓글</div>
                <div>수정</div>
                <div>삭제</div>
              </div>
            </section>
          </section>
        </section>
      </StyledSingleBoard>
    </>
  );
};

export default SingleBoard;
