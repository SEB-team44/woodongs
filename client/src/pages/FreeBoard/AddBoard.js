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
    align-items: center;
    justify-content: center;
    margin: 50px auto;
    border: 1px solid black;
    border-radius: 50px;
    padding: 30px;
    width: 800px;
    /* flex-direction: column; */

    /* margin-left: 10%;
    margin-right: 10%; */
    /* padding-left: 5%;
    margin: 50px 500px;  */
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
  .addboard-body-box {
    justify-content: center;
    align-items: center;
  }
`;

const AddBoard = () => {
  const navigate = useNavigate();
  const [bodyValue, setBodyValue] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // const changeTitle = (event) => {
  //   setTitle(event.target.value);
  // };
  // const changeContent = (event) => {
  //   setContent(event.target.value);
  // };
  //[post]게시글작성
  const submitButton = () => {
    const access_token = localStorage.getItem("access_token");
    const reqPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
        "Access-Control-Allow-Origin": "*",
        Authorization: access_token,
      },
      body: JSON.stringify({
        title: content.title,
        body: content.body,
      }),
    };

    fetch("https://api.woodongs.site/post", reqPost)
      //fetch("https://api.woodongs.site/post?size=10&cursorId=10", reqPost)

      .then((res) => {
        if (res.ok) {
          alert("새로운 게시물이 성공적으로 등록되었습니다 :-D");
          navigate("/FreeBoard");
          return res.json();
        }
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const getValue = (e) => {
    const { value } = e.target;
    console.log(e.target.name);
    console.log("value", value);
    setContent({
      ...content,
      title: value,
    });
  };
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
              onChange={(e) => getValue(e)}
            />
          </section>

          <section className="addboard-body-box">
            <h1>글쓰기</h1>
            <textarea
              rows="15"
              cols="97"
              maxLength={2000}
              className="addboard-textarea body-textarea"
              value={bodyValue}
              onChange={(event) => {
                let data = event.target.value;
                setBodyValue(data);
                setContent({
                  ...content,
                  body: bodyValue,
                });
                console.log(bodyValue);
              }}
            />
          </section>
          <section className="addboard-submit-box">
            <Button
              className="submit-button"
              variant="contained"
              onClick={(e) => submitButton(e)}
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
// };

export default AddBoard;
