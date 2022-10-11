import styled from "styled-components";
import { Link } from "react-router-dom";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { UserLogin } from "../../UserContext";
import { useContext, useState } from "react";
import { UserInfo } from "../../UserContext";
import Alert from "../Main/Alert";
import SockJS from "sockjs-client";
import StompJs from "stompjs";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const StyledNav = styled.div`
  .header-container {
    height: 63.5px;
    width: 100vw;
    /* border: solid black 1px; */
    background-color: white;
  }
  .nav-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 63.5px;
    padding-left: 10px;
  }
  .logo-img {
    height: 60px;
  }
  .tap-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 0px;
    height: 63.5px;
    text-decoration: none;
  }
  .tap-box li {
    text-decoration: none;
    padding: 8px 12px;
  }
  .tap-box li:hover {
    background-color: #b6c6d4;
    border-radius: 4px;
  }
  ol {
    margin: 0px;
  }
  a,
  li {
    list-style: none;
    padding-right: 20px;
    text-decoration-line: none;
    color: black;
    text-decoration: none;
  }
  .other-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 10px;
  }
  .search-box {
    padding-right: 20px;
  }
  .info-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    padding-left: 20px;
  }
  .info-box > * {
    margin-left: 20px;
  }
  .myinfo-img {
    height: 25px;
    width: 25px;
  }
  textarea {
    resize: none;
  }
  .avatarimg {
    width: 30px !important;
    height: 30px !important;
    border-radius: 50%;
  }
  .group-btn {
    border: 0;
    outline: 0;
    cursor: pointer;
    background-color: white;
  }
  .alert-btn {
    border: 0;
    outline: 0;
    cursor: pointer;
    background-color: white;
  }
  .alert {
    height: 200px;
  }
  .jb-text {
    padding: 15px 20px;
    background-color: white;
    border: 0.05px solid black;
    border-radius: 5px;
    color: black;
    position: absolute;
    opacity: 0;
    transition: all ease 0.5s;
  }
  .jb-title:hover + .jb-text {
    opacity: 1;
  }
`;

const Navbar = ({ myAround, cardList, setCardList, setRerender, reRender}) => {
  const { userInfo, setUserInfo } = useContext(UserInfo); //로그인 한 사용자 정보
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [searchInput, setSearchInput] = useState("");
  const { isLogin } = useContext(UserLogin);
  const [searchOption, setSearchOption] = useState("제목");
  const token = localStorage.getItem("access_token");
  const [alarm, setAlarm] = useState([]);

  let socketJs = new SockJS("https://api.woodongs.site/ws-stomp");
  const stomp = StompJs.over(socketJs);

  useEffect(() => {
    stomp.connect({ token: token }, (frame) => {
      console.log("connecteed" + frame);
      stomp.subscribe(
        `/queue/alarm/` + userInfo.memberId,
        function (respoonse) {
          let resmessage = JSON.parse(respoonse.body);
          setAlarm((alarm) => [...alarm, resmessage.senderNickname]);
        }
      );
    });
    console.log(stomp)
    return () => {
      //연결되기 전에 닫히는 문제 해결 
      if(stomp.ws.readyState === 1){
        stomp.disconnect(() => {});
      }
    };


  }, []);

  useEffect(() => {
    const getMember = () => {
      fetch("https://api.woodongs.site/member/me", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          withCredentials: true,
          "Access-Control-Allow-Origin": "*",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("로컬로그인정보 ", res);
          setUserInfo({ ...res });
          return res 
        })
    };
    getMember();
  }, [alarm]);

  const handleClick1 = (event) => {
    setAnchorEl1(anchorEl1 ? null : event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(anchorEl2 ? null : event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleSearchOptions = (e) => {
    setSearchOption(() => e.target.value);
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchInput(() => e.target.value);
  };

  const handleInputSubmit = (e) => {
    // console.log(searchOption);
    let filtered;
    if (searchOption === "제목") {
      filtered = cardList.filter((el) => {
        return el.title.includes(searchInput);
      });
    }
    if (searchOption === "지역") {
      filtered = cardList.filter((el) => {
        return el.city.includes(searchInput);
      });
    }
    setCardList([...filtered]);
  };

  const handleClearSubmit = () => {
    setRerender(!reRender);
  };

  const open1 = Boolean(anchorEl1);
  const id1 = open1 ? "simple-popper" : undefined;

  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? "simple-popper" : undefined;

  const handleAlarmState = () => {
    setAlarm([]);
  };

  return (
    <>
      <StyledNav>
        <header className="header-container">
          <nav className="nav-container">
            <section className="logo-box">
              <Link to="/main">
                <img
                  className="logo-img"
                  src={require("../../../src/img/logo.png")}
                />
              </Link>
            </section>
            <ol className="tap-box">
              <Link to="/EntireMain">
                <li>전체 스터디</li>
              </Link>

              {isLogin ? (
                <Link to="/main">
                  <li>내 주변 스터디</li>
                </Link>
              ) : (
                <Link to="/main">
                  <li>스터디 목록</li>
                </Link>
              )}
              <Link to="/FreeBoard">
                <li>전체 게시판</li>
              </Link>
            </ol>
            <section className="other-box">
              {isLogin ? (
                <>
                  {myAround ? (
                    <div></div>
                  ) : (
                    <div className="search-box">
                      <select onChange={(e) => handleSearchOptions(e)}>
                        <option value="제목">제목</option>
                        <option value="지역">지역</option>
                      </select>

                      <Input
                        onChange={(e) => handleInputChange(e)}
                        placeholder="스터디를 검색해주세요."
                        value={searchInput}
                      />

                      <Button onClick={(e) => handleInputSubmit(e)}>
                        검색
                      </Button>
                      <Button onClick={(e) => handleClearSubmit(e)}>
                        초기화
                      </Button>
                    </div>
                  )}

                  <div className="info-box">
                    <div className="new-study-btn">
                      <Link to="/study/recruit">
                        <Button className="submit-button" variant="contained">
                          스터디 생성
                        </Button>
                      </Link>
                    </div>
                    {/* 알림버튼 */}
                    <div className="alert-img">
                      <button
                        className="alert-btn"
                        type="button"
                        onClick={handleClick1}
                      >
                        {alarm.length === 0 ? (
                          <img
                            className="myinfo-img myinfo-ball-img"
                            src={require("../../../src/img/ball.png")}
                          />
                        ) : (
                          <img
                            className="myinfo-img myinfo-ball-img"
                            src={require("../../../src/img/bellring.png")}
                          />
                        )}
                      </button>
                      <Popover
                        id={id1}
                        open={open1}
                        anchorEl={anchorEl1}
                        onClose={handleClose1}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                      >
                        <Typography
                          sx={{
                            borderRadius: 7,
                            p: 1,
                            bgcolor: "background.paper",
                            textDecoration: "none",
                          }}
                        >
                          {alarm.length !== 0 ? (
                            <p className="alert" onClick={handleAlarmState}>
                              <Alert alarm={alarm}></Alert>
                            </p>
                          ) : (
                            <p>스터디 신청이 오지 않았습니다.</p>
                          )}
                        </Typography>
                      </Popover>
                    </div>
                    {/* 내그룹버튼 */}

                    <div className="group-img">
                      {userInfo.studyResponseDtos.length !== 0 ? (
                        <Link to="/MyGroup">
                          <button
                            className="group-btn"
                            aria-describedby={id2}
                            type="button"
                            onClick={handleClick2}
                          >
                            <img
                              className="myinfo-img myinfo-group-img "
                              src={require("../../../src/img/group.png")}
                            />
                            
                          </button>
                        </Link>
                      ) : (
                        <>
                        <img
                          className="myinfo-img myinfo-group-img jb-title"
                          src={require("../../../src/img/group.png")}
                        />
                        <div className = "jb-text" >스터디 생성 또는 참여시 활성화됩니다.</div>
                        </>
                      )}
                    </div>

                    <div className="my-info-btn">
                      <Link to="/MyPage">
                        <img
                          className="avatarimg"
                          src={
                            userInfo.profileImageUrl
                              ? userInfo.profileImageUrl
                              : require("../../../src/img/avatar.png")
                          }
                        />
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <Link to="/Login">
                  <Button>로그인</Button>
                </Link>
              )}
            </section>
          </nav>
        </header>
      </StyledNav>
    </>
  );
};

export default Navbar;
