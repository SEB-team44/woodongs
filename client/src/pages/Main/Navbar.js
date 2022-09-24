import styled from "styled-components";
import { Link } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { UserLogin } from "../../UserContext";
import { useContext } from "react";
import { UserInfo } from "../../UserContext";

const StyledNav = styled.div`
  .header-container {
    height: 63.5px;
    width: 100vw;
    border: solid black 1px;
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
    width: 30px;
    height: 30px;
  }
  .group-btn {
    border: 0;
    outline: 0;
    cursor: pointer;
    background-color: white;
  }
`;

const Navbar = () => {
  const { userInfo, setUserInfo } = useContext(UserInfo); //로그인 한 사용자 정보
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { isLogin } = useContext(UserLogin);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
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
              <div className="search-box">
                <Input placeholder="Search.." />
                <Button>검색</Button>
              </div>
              {isLogin ? (
                <div className="info-box">
                  <div className="new-study-btn">
                    <Link to="/study/recruit">
                      <Button className="submit-button" variant="contained">
                        스터디 생성
                      </Button>
                    </Link>
                  </div>
                  <div className="alert-img">
                    <img
                      className="myinfo-img myinfo-ball-img"
                      src={require("../../../src/img/ball.png")}
                    />
                  </div>
                  <div className="group-img">
                    <button
                      className="group-btn"
                      aria-describedby={id}
                      type="button"
                      onClick={handleClick}
                    >
                      <img
                        className="myinfo-img myinfo-group-img"
                        src={require("../../../src/img/group.png")}
                      />
                    </button>
                    <Popper id={id} open={open} anchorEl={anchorEl}>
                      <Box
                        sx={{ border: 1, p: 1, bgcolor: "background.paper" }}
                      >
                        <Link to="/MyGroup">
                          <button>1번스터디</button>
                          <button>2번스터디</button>
                        </Link>
                      </Box>
                    </Popper>
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
