import React from "react";
import styled from "styled-components";
import Navbar from "../Main/Navbar";
import ChatSideBar from "./ChatSideBar";
import ChatMessage from "./ChatMessage";

const MyGroupStyled = styled.div`
  .my-group-container {
    align-items: center;
    /* justify-content: space-between; */
    margin: 50px auto;
    border: 1px solid black;
    border-radius: 50px;
    padding: 30px;
    width: 1300px;
    display: flex;
    background-color: #dedede;
  }
  .my-group__inner {
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: gray;
    margin: 20px;
    width: 1300px;
    height: 400px;
  }
`;

const MyGroup = () => {
  return (
    <>
      <MyGroupStyled>
        <Navbar />
        <div className="my-group-container">
          <ChatSideBar />
          <div className="my-group__inner">
            <div className="my-group__title">채팅방</div>
            <ChatMessage />
          </div>
        </div>
      </MyGroupStyled>
    </>
  );
};

export default MyGroup;
