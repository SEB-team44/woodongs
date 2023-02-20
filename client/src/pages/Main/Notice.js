import { React, useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserLogin } from "../../UserContext";
import Alert from "@mui/material/Alert";
import { UserInfo } from "../../UserContext";
import CircularProgress from "@mui/material/CircularProgress";
import { axiosInstance } from "../utiles/axiosInstance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Notice = (props) => {
  const { userInfo, setUserInfo } = useContext(UserInfo);
  console.log(userInfo, "useri");
  const { isLogin } = useContext(UserLogin);
  // const [location, setLocation] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      const reqOAuthPost = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: userInfo.email,
          password: userInfo.pw,
          // "mock",
        }),
      };

      const { latitude, longitude } = pos.coords;
      localStorage.setItem("latitude", `${latitude}`);
      localStorage.setItem("longitude", `${longitude}`);

      reqOAuthPost.headers["Authorization"] =
        localStorage.getItem("access_token");
      reqOAuthPost.body = JSON.stringify({
        latitude: latitude,
        longitude: longitude,
      });

      fetch("https://api.woodongs.site/member/locate", reqOAuthPost).then(
        (res) => {
          fetch("https://api.woodongs.site/member/me", {
            headers: reqOAuthPost.headers,
          })
            .then((res) => res.json())
            .then((res) => {
              setUserInfo({ ...res });
              return navigate("/main");
            })
            .catch((error) => {
              alert(error);
            });
        }
      );

      setTimeout(() => {
        setIsLoading(() => false);
      }, 300);
    };

    const handleError = (error) => {
      alert(`ERROR(${error.code}): ${error.message}`);
      setIsLoading(() => false);
    };

    const { geolocation } = navigator;

    geolocation.getCurrentPosition(handleSuccess, handleError);
  };

  return (
    <>
      <StyledNav>
        <nav className="nav-container">
          <section className="profile-box">
            <div className="avatar-text">
              {isLogin ? (
                <ol className="profile-box pofile-lists">
                  <li className="show-today">{todayTime().slice(0, 13)}</li>
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
                <ol className="profile-box pofile-lists">
                  <li className="show-today">{todayTime().slice(0, 13)}</li>
                  <li>
                    <Link to="/Login">로그인 후 이용해 주세요</Link>
                  </li>
                </ol>
              )}
            </div>
          </section>
          <section className="notice-box-1">
            {/* <div className="notice-text"> */}
            <Alert id="alert-Info" severity="info">
              우리 동네 스터디 woodongs! 스터디를 생성하여 팀원들과 자유롭게
              소통해보세요 !
            </Alert>

            {/* </div> */}
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
              <div>
                {isloading ? (
                  <CircularProgress size={30} sx={{ mr: 6 }} />
                ) : (
                  <Button
                    onClick={HandleMyloaction}
                    className="my-location-btn"
                  >
                    위치 정보 받기
                  </Button>
                )}
              </div>
            </div>
          </section>
        </nav>
      </StyledNav>
    </>
  );
};
const StyledNav = styled.div`
  .nav-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 60px;
    /* border-radius: 3%; */
    background-color: white;
    box-shadow: 1px 1px 3px 1px gray;
  }

  .notice-box1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-left: 0px;
  }
  .notice-box2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 0px;
  }

  #alert-Info {
    height: 78%;
    align-items: center;
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
    height: 100%;
  }

  .pofile-lists {
    margin-left: 30px;
  }

  .location-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 300px;
  }
  .location-box > * {
    margin-right: 30px;
  }

  .info-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 15px;
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

  @media (max-width: 900px) {
    #alert-Info {
      visibility: collapse;
    }
  }
  @media (max-width: 660px) {
    .notice-box-1 {
      display: none;
    }
  }
  @media (max-width: 535px) {
    .now-location {
      display: none;
    }
    .location-box {
      justify-content: center;
    }
    .show-today {
      display: none;
    }
  }
`;
export default Notice;
