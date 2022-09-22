import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "antd";

import { useState, useRef, useContext } from "react";
import { UserLogin } from "../../UserContext";

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
  const {setIslogin} = useContext(UserLogin);
  const [file, setFile] = useState();
  const [Image, setImage] = useState("../src/img/avatar.png");
  const fileInput = useRef(null);
  const onChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setImage("../src/img/avatar.png");
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleLogout=() => {
    localStorage.clear();
    setIslogin(false);
  }

  return (
    <>
      <MyPageStyled>
        <Navbar />
        <div className="mypage_container">
          <div className="mypage_content">
            <div className="mypage_upcontent">
              <div className="mypage_photo">
                <Avatar
                  className="avatarimg"
                  src={Image}
                  style={{ margin: "20px" }}
                  size="small"
                  onClick={() => {
                    fileInput.current.click();
                  }}
                />
                <img
                  className="avatarimg"
                  src={require("../../../src/img/avatar.png")}
                  onClick={() => {
                    fileInput.current.click();
                  }}
                />
                <input
                  type="file"
                  style={{ display: "none" }} //파일업로드 숨김
                  accept="image/jpg,impge/png,image/jpeg"
                  name="profile_img"
                  onChange={onChange}
                  ref={fileInput}
                />
              </div>
              <div className="mypage_button">
                <div className="checknumber">
                  <button>번호인증</button>
                </div>
                <div className="mypage_update">
                  <Button>
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
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
              <Button onClick={()=> handleLogout()} className="submit-button" variant="contained">
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
