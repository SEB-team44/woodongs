import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Notice from "./Notice";
const StyledMain = styled.div`
  .main-container{
    height: 98vh;
    width: 98vw;
    border: solid black 1px;
  }
`;

const Main = () => {
  return (
    <>
      <StyledMain>
      <div className="main-container">
        <div className="main-navi-container">
          <Navbar />
        </div>
        <div className="main-context-container">
          <div className="main-notice-container">
            <Notice />
          </div>
          <div className="main-cardlist-container">

          </div>
        </div>
        helloworld
      </div>
      </StyledMain>
    </>
  );
};

export default Main;
