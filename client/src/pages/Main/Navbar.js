import React from "react";
import styled from "styled-components";

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
  return (
    <>
      <StyledNav>
        <header className="header-container">
          <nav className="nav-container">
            <section className="logo-box">
              <img
                className="logo-img"
                src={require("../../../src/img/logo.png")}
              />
            </section>

            <ol className="tap-box">
              <li>내 주변 스터디</li>
              <li>내 그룹</li>
              <li>전체 게시판</li>
            </ol>

            <section className="other-box">
              <div className="search-box">
                <textarea></textarea>
              </div>
              <div className="info-box">
                <div className="new-study-btn">
                  <button>스터디 생성</button>
                </div>
                <div className="alert-btn">
                  <button>종</button>
                </div>
                <div className="my-info-btn">
                  <button>my info</button>
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
