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
`;

const Navbar = ({ myAround, cardList, setCardList, setRerender, reRender }) => {
  const { userInfo, setUserInfo } = useContext(UserInfo); //로그인 한 사용자 정보
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [searchInput, setSearchInput] = useState("");
  const { isLogin } = useContext(UserLogin);
  const [searchOption, setSearchOption] = useState("제목");
  const token = localStorage.getItem("access_token")

  // console.log("userInfo", userInfo);
  let socketJs = new SockJS("https://woodongs.site/ws-stomp");
  const stomp = StompJs.over(socketJs);
  useEffect(() => {
    stomp.connect({token: token}, (frame) => {
      console.log('connecteed' + frame)
      stomp.subscribe(`/sub/alarm/`+ userInfo.memberId , function(respoonse){
        console.log(respoonse);
        console.log(JSON.parse(respoonse.body));
      })
    });
    return () => {
      stomp.disconnect(() => {});
    };
  }, []);

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
                        <img
                          className="myinfo-img myinfo-ball-img"
                          src={require("../../../src/img/ball.png")}
                        />
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
                          <div className="alert">
                            <Alert></Alert>
                          </div>
                        </Typography>
                      </Popover>
                    </div>
                    {/* 내그룹버튼 */}
                    <div className="group-img">
                      <button
                        className="group-btn"
                        aria-describedby={id2}
                        type="button"
                        onClick={handleClick2}
                      >
                        <img
                          className="myinfo-img myinfo-group-img"
                          src={require("../../../src/img/group.png")}
                        />
                      </button>
                      <Popover
                        id={id2}
                        open={open2}
                        anchorEl={anchorEl2}
                        onClose={handleClose2}
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
                          }}
                        >
                          <div>
                            <Link to="/MyGroup">
                              <ul>
                                {userInfo.studyResponseDtos.map((el) => {
                                  return <li key={el.studyId}>{el.title}</li>;
                                })}
                              </ul>
                            </Link>
                          </div>
                        </Typography>
                      </Popover>
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
