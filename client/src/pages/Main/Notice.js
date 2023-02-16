import { React, useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserLogin } from "../../UserContext";
import Alert from "@mui/material/Alert";
import { UserInfo } from "../../UserContext";
import CircularProgress from "@mui/material/CircularProgress";

const Notice = (props) => {
  const { userInfo, setUserInfo } = useContext(UserInfo);
  const { isLogin } = useContext(UserLogin);
  const [location, setLocation] = useState("");
  const [isloading, setIsLoading] = useState(false);

  //현재시간
  const todayTime = () => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let todayDate = now.getDate();
    const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SAT"];
    let dayOfWeek = week[now.getDay()];
    return todayYear + "." + todayMonth + "." + todayDate + "." + dayOfWeek;
  };

  const HandleMyloaction = () => {
    setIsLoading(() => true);
    const handleSuccess = (pos) => {
      const { latitude, longitude } = pos.coords;
      setLocation({
        latitude,
        longitude,
      });
      // setTimeout(() => {
      console.log(userInfo);
      setUserInfo({
        ...userInfo,
        latitude: latitude,
        longitude: longitude,
      });

      setIsLoading(() => false);
      // }, );
    };
    const handleError = (error) => {
      alert(error.message);
      setIsLoading(() => false);
    };

    const { geolocation } = navigator;

    geolocation.getCurrentPosition(handleSuccess, handleError);
  };

  return (
    <>
      <StyledNav>
        <nav className="nav-container">
          <section className="notice-box-1">
            <div className="notice-text">
              <Alert severity="info">
                공지사항 입니다!!공지사항입니다! 공지사항 봐주세요!
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
                  <li>{todayTime().slice(0, 13)}</li>
                  <li>
                    <Link to="/MyPage">
                      <img
                        alt="avatorImg"
                        className="avatarimg"
                        src={
                          userInfo.profileImageUrl
                            ? userInfo.profileImageUrl
                            : require("../../../src/img/avatar.png")
                        }
                      />
                    </Link>
                  </li>
                  <li>{userInfo.nickName}</li>
                </ol>
              ) : (
                <ol className="profile-box">
                  <li>{todayTime().slice(0, 13)}</li>
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
                <p>탐색 위치</p>
              </div>
              {/* 전체 스터디 에서는 전국이 뜨게하고, 주변 스터디에서는 내위치가 뜨게 해야함. */}
              <div className="saved-location">
                <h3>{props.title}</h3>
              </div>

              {isloading ? (
                <CircularProgress size={20} sx={{ mt: 5, mb: 1 }} />
              ) : (
                <button
                  onClick={() => HandleMyloaction()}
                  className="my-location-btn"
                >
                  위치 정보 받기
                </button>
              )}
            </div>
            <div></div>
          </section>

          {/* <CircularProgress size={30} sx={{ mt: 5, mb: 1 }} /> */}
        </nav>
      </StyledNav>
    </>
  );
};
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
    border-radius: 50%;
  }
  a {
    text-decoration: none;
    list-style: none;
  }
`;
export default Notice;
