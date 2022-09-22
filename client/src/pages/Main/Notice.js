import { React, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserLogin } from "../../UserContext";
import Alert from "@mui/material/Alert";

const StyledNav = styled.div`
  .nav-container {
    margin-left: 30px;
    margin-right: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 50.5px;
    border: black solid 1px;
    border-radius: 3%;
    background-color: white;
  }

  .notice-box1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 0px;
    width: 60%;
  }
  .notice-box2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 0px;
    width: 20%;
  }
  ol {
    margin: 0px;
  }
  li {
    list-style: none;
    padding-right: 20px;
  }

  .profile-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 0px;
    height: 63.5px;
  }

  .location-container {
    width: 25%;
  }
  .location-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding-right: 10px;
  }

  .info-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 20px;
  }

  .avatarimg {
    width: 25px;
    height: 25px;
  }
`;

const Notice = () => {
  const { isLogin } = useContext(UserLogin);

  return (
    <>
      <StyledNav>
        <nav className="nav-container">
          <section className="notice-box-1">
            <div className="notice-text">
              <Alert severity="info">
                공지사항 입니다!!공지사항입니다! 공지사항 봐주세요! 공지사항
                전체게시판이랑 연결되야 될 듯?
              </Alert>
              {/* <div className="notice-btn">
              <button>Notice</button>
            </div> */}
            </div>
          </section>
          <section className="profile-box">
            <div className="avatar-text">
              {isLogin ? (
                <ol className="profile-box">
                  <li>13 Apr, 2022</li>
                  <li>
                    <Link to="/MyPage">
                      <img
                        className="avatarimg"
                        src={require("../../../src/img/avatar.png")}
                      />
                    </Link>
                  </li>
                  <li>kim-young-ha</li>
                </ol>
              ) : (
                <ol className="profile-box">
                  <li>13 Apr, 2022</li>
                  <li>
                    <Link to="/Login">로그인 후 이용해 주세요</Link>
                  </li>
                </ol>
              )}
            </div>
          </section>

          <section className="location-container">
            <div className="location-box">
              <div className="now-location">
                <p>현재 위치</p>
              </div>
              <div className="saved-location">
                {isLogin ? <p>서울특별시 서대문구</p> : <p>전국</p>}
              </div>
              <button className="my-location-btn">밑</button>
            </div>
          </section>
        </nav>
      </StyledNav>
    </>
  );
};

export default Notice;
