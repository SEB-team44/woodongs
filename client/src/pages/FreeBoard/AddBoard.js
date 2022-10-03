import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Main/Navbar";
import Notice from "../Main/Notice";
import Footer from "../Main/Footer";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";

const StyledAddBoard = styled.div`
  .addboard-navbar {
    margin-bottom: 30px;
  }
  .addboard-notice-container {
    margin-bottom: 30px;
  }
  .addboard-container {
    display: flex;
    flex-direction: column;
    border: black solid 1px;
    /* margin-left: 10%;
    margin-right: 10%; */
    padding-left: 5%;
    margin: 50px 500px;
  }
  textarea {
    resize: none;
  }
  .addboard-textarea {
    width: 90%;
    margin-bottom: 50px;
    height: 25px;
  }

  .body-textarea {
    height: 300px;
  }
  .addboard-submit-box {
    text-align: center;
    margin: 50px;
  }
`;

const AddBoard = () => {
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");

  // const changeTitle = (event) => {
  //   setTitle(event.target.value);
  // };
  // const changeContent = (event) => {
  //   setContent(event.target.value);
  // };
  //[post]게시글작성
  // const createBoard = async () => {
  //   const req = {
  //     id: localStorage.getItem("id"),
  //     title: title,
  //     content: content,
  //   };
  //   await axios
  //     .post("http://localhost:3000/FreeBoard", req)
  //     .then((res) => {
  //       console.log("success!");
  //       console.log(res.data);
  //       alert("새로운 게시글을 성공적으로 등록했습니다.");
  //       Navigate(`/SingleBoard/${res.data}`); //새롭게 등록한 글 상세페이지로 이동
  //     })
  //     .catch((err) => {
  //       console.log("error");
  //       console.log(err);
  //     });
  return (
    <>
      <StyledAddBoard>
        <section className="addboard-navbar">
          <Navbar />
        </section>
        <section className="addboard-notice-container">
          <Notice />
        </section>
        <section className="addboard-container">
          <section className="addboard-title-box">
            <h1>제목</h1>
            <input
              className="addboard-textarea title-textarea"
              placeholder="최대 30자까지 입력 가능합니다."
              // value={title}
              // onChange={changeTitle}
            />
          </section>

          <section className="addboard-body-box">
            <h1>글쓰기</h1>
            <textarea
              className="addboard-textarea body-textarea"
              // value={content}
              // onChange={changeContent}
            />
          </section>

          <section className="addboard-tags-box">
            <h1>검색 태그(#)</h1>
            <input className="addboard-textarea tags-textarea" />
          </section>
          <section className="addboard-submit-box">
            <Button
              className="submit-button"
              variant="contained"
              // onClick={createBoard}
            >
              게시하기
            </Button>
          </section>
        </section>
        <section className="freeboard-footer-container">
          <Footer />
        </section>
      </StyledAddBoard>
    </>
  );
};
// }

export default AddBoard;
