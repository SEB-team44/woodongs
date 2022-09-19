import styled from "styled-components";
import { Link } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Button from "@mui/material/Button";

const StyledNav = styled.div`
  .header-container {
    height: 63.5px;
    width: 100%;
    border: solid black 1px;
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
  }
  ol {
    margin: 0px;
  }
  li {
    list-style: none;
    padding-right: 20px;
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
    width: 25px;
    height: 25px;
  }
`;

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
              <Link to="/main">
                <li>내 주변 스터디</li>
              </Link>
              <Link to="/FreeBoard">
                <li>전체 게시판</li>
              </Link>
            </ol>

            <section className="other-box">
              <div className="search-box">
                <textarea></textarea>
              </div>
              <div className="info-box">
                <div className="new-study-btn">
                  <Link to="/AddStudy">
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
                  <img
                    className="myinfo-img myinfo-group-img"
                    src={require("../../../src/img/group.png")}
                  />
                </div>
                <div className="group-btn">
                  <div>
                    <button
                      aria-describedby={id}
                      type="button"
                      onClick={handleClick}
                    >
                      내 그룹
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
                </div>
                <div className="my-info-btn">
                  <Link to="/MyPage">
                    <img
                      className="avatarimg"
                      src={require("../../../src/img/avatar.png")}
                    />
                  </Link>
                </div>
              </div>
            </section>
          </nav>
        </header>
      </StyledNav>
    </>
  );
};

export default Navbar;
