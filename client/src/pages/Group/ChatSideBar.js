import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ChatSideBarStyled = styled.div`
  .sidebar_container {
    flex-direction: column;
    align-items: left;
  }

  .avatar {
    padding: 20px;

  }
`;

const ChatSideBar = () => {
  return (
    <>
      <ChatSideBarStyled>
        <div className="sidebar_container">
          <div className="avatar">
            <FontAwesomeIcon icon={faUser} size="2x" />
          </div>
          <div className="avatar">
            <FontAwesomeIcon icon={faUser} size="2x" />
          </div>
        </div>
      </ChatSideBarStyled>
    </>
  );
};

export default ChatSideBar;
