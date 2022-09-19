import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const MyPageStyled = styled.div`
  .mypage_content {
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 50px auto;
    border: 1px solid black;
    border-radius: 50px;
    padding: 30px;
    width: 800px;
  }
  .mypage_button {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

const MyPage = () => {
  return (
    <>
      <MyPageStyled>
        <Navbar />
        <div className="mypage_container">
          <div className="mypage_content">
            <div className="mypage_upcontent">
              <div className="mypage_photo">
                <img
                  className="avatarimg"
                  src={require("../../../src/img/avatar.png")}
                />
              </div>
              <div className="mypage_button">
                <div className="checknumber">
                  <button>번호인증</button>
                </div>
                <div className="mypage_update">
                  <button>수정버튼</button>
                </div>
              </div>
              <div className="name">최진영</div>
            </div>
            <div className="mypage_downcontent">
              User info
              <div className="user_info">
                <div className="job">직무 : 웹 프론트엔드</div>
                <div className="career">경력 : N년차</div>
                <div className="introduce">소개 : 열심히하겠습니다!</div>
              </div>
            </div>
            <Link to="/Login">
              <Button className="submit-button" variant="contained">
                LogOut
              </Button>
            </Link>
          </div>
        </div>
      </MyPageStyled>
    </>
  );
};

export default MyPage;
