import styled from "styled-components";
import { Link } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";

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
    padding-left: 20px;
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
              <Link to="/Main">
                <img
                  className="logo-img"
                  src={require("../../../src/img/logo.png")}
                />
              </Link>
            </section>

            <ol className="tap-box">
              <li>내 주변 스터디</li>
              <li>전체 게시판</li>
            </ol>

            <section className="other-box">
              <div className="search-box">
                <textarea></textarea>
              </div>
              <div className="info-box">
                <div className="new-study-btn">
                  <Link to="/AddStudy">
                    <button>스터디 생성</button>
                  </Link>
                </div>
                <div className="alert-btn">
                  <button>종</button>
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
                    <button>my info</button>
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
