import React from "react";
import styled from "styled-components";

const ChatMessageStyled = styled.div`
  .chat-message {
    border: 1px solid black;
  }
`;

const ChatMessage = () => {
  return (
    <>
      <ChatMessageStyled>
        <div className="chat-message">채팅창구현해야지</div>
      </ChatMessageStyled>
    </>
  );
};

export default ChatMessage;
