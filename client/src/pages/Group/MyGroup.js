import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Navbar from "../Main/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import SockJS from "sockjs-client";
import StompJs from "stompjs";
import { useContext } from "react";
import { IsChat } from "../../UserContext";
import { UserInfo } from "../../UserContext";
import Button from "@mui/material/Button";

const MyGroup = () => {
  const { userInfo } = useContext(UserInfo);
  const { setIsChat } = useContext(IsChat);
  const token = localStorage.getItem("access_token");
  const header = {
    "Content-Type": "application/json",
    Accept: "application/json",
    credentials: "include",
    Authorization: token,
  };
  const chatInfo = userInfo.studyResponseDtos;
  const [memberInfo, setMemberInfo] = useState([]);
  const [getStudyId, setGetstudyId] = useState(0);
  const [getChat, setGetchat] = useState([]);
  const [sendContent, setSendContent] = useState("");
  const [stompSet, setStompSet] = useState(new Set());
  const [validation, setValidation] = useState(false);
  const [stomp, setStomp] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const getPreviousChat = () => {
      fetch(`https://api.woodongs.site/chatroom/${getStudyId}`, {
        method: "GET",
        headers: header,
      })
        .then((res) => res.json())
        .then((res) => {
          setGetchat([...res, ...getChat]);
        })
        .catch((error) => alert("채팅방을 클릭해주세요"));
    };
    getPreviousChat();

    return () => {
      console.log(stomp);
    };
  }, [getStudyId]);

  const handleWebsocket = (studyId) => {
    fetch("https://api.woodongs.site/study/" + `${studyId}`, {
      method: "GET",
      headers: header,
    })
      .then((res) => res.json())
      .then((res) => setMemberInfo([...res.memberResponseDtos]))
      .then(() => {
        setGetstudyId(studyId);
        setGetchat([]);
        let socketJs = new SockJS("https://api.woodongs.site/ws-stomp");
        const currentStomp = StompJs.over(socketJs);

        setStomp(() => currentStomp);

        currentStomp.connect({ token: token }, (frame) => {
          if (currentStomp.ws.readyState === 1) {
            if (!stompSet.has(studyId)) {
              setStompSet(() => stompSet.add(studyId));
              currentStomp.subscribe(
                `/topic/chat/` + studyId,
                function (response) {
                  let res = JSON.parse(response.body);

                  if (userInfo.memberId !== res.senderId) {
                    setIsChat(true);
                  }

                  setGetchat((chatting_list) => [...chatting_list, res]);
                }
              );
            }
          }
        });
      })
      .then(() => {
        setValidation(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          window.location.replace("/login");
        }
      });
  };

  const pubChatData = () => {
    const msg = {
      senderId: Number(userInfo.memberId),
      senderNickname: userInfo.nickName,
      receiverId: Number(getStudyId),
      message: `${sendContent}`,
    };

    stomp.send(
      //알람 전송
      `/app/chat`,
      {},
      JSON.stringify(msg)
    );
  };

  const handleChangeContent = (e) => {
    setSendContent(e.target.value);
  };

  const handlePubChat = (e) => {
    e.preventDefault();
    pubChatData();
    setSendContent(() => "");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [getChat]);
  return (
    <>
      <MyGroupStyled>
        <section className="main-nav-container">
          <Navbar />
        </section>

        <div className="my-group-container">
          <div className="sidebar_container">
            {/* 채팅 그룹 출력  */}
            {chatInfo &&
              chatInfo.map((el) => {
                return (
                  <>
                    <div
                      className="chat-groups"
                      key={el.studyId}
                      onClick={(e) =>
                        el.studyId !== getStudyId
                          ? handleWebsocket(el.studyId)
                          : null
                      }
                    >
                      <div className="avatar">
                        <FontAwesomeIcon icon={faUser} size="2x" />
                      </div>
                      <div className="chat-room-number">
                        {el.studyId}번 채팅방
                      </div>
                      <div className="chat-group-name">- {el.title} -</div>
                    </div>
                  </>
                );
              })}
          </div>

          <div className="my-group__inner">
            <div className="my-group__title">{getStudyId}번 채팅방 </div>
            <div className="chat-message-box">
              <div>
                {/* 채팅 내용출력 */}
                {getChat &&
                  getChat.map((el) => {
                    return (
                      <>
                        <div key={el.senderId} className="message-others">
                          <div className="memberIng-box">
                            {memberInfo.map((element) => {
                              if (element.memberId === el.senderId) {
                                return (
                                  <>
                                    {element.profileImageUrl ? (
                                      <img
                                        className="memberImg"
                                        src={element.profileImageUrl}
                                      />
                                    ) : (
                                      <img
                                        className="memberImg"
                                        src={require("../../../src/img/avatar.png")}
                                      />
                                    )}
                                  </>
                                );
                              }
                            })}
                          </div>
                          <div>
                            <div className="message-nickname">
                              {el.senderNickname || el.senderNickName}
                            </div>
                            <div className="message-content">{el.message}</div>
                          </div>
                          <div ref={messagesEndRef} />
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>

            <div className="chatInput">
              {getStudyId === 0 ? (
                <>
                  <div className="init-input">
                    {" "}
                    좌측 스터디 아이콘을 클릭하여 채팅방에 입장하세요.{" "}
                  </div>
                </>
              ) : validation ? (
                <>
                  <textarea
                    className="input"
                    placeholder="내용을 입력하세요."
                    onChange={(e) => handleChangeContent(e)}
                    value={sendContent}
                  />
                  <Button
                    className="submit-btn"
                    onClick={(e) =>
                      sendContent !== "" ? handlePubChat(e) : null
                    }
                  >
                    전송
                  </Button>
                </>
              ) : null}
            </div>
          </div>

          <div className="members">
            {memberInfo &&
              memberInfo.map((el) => {
                return (
                  <>
                    <div className="member">
                      {" "}
                      {!el.profileImageUrl ? (
                        <img
                          className="memberImg"
                          src={require("../../../src/img/avatar.png")}
                        />
                      ) : (
                        <div>
                          <img className="memberImg" src={el.profileImageUrl} />
                        </div>
                      )}
                      <div>{el.nickName}</div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </MyGroupStyled>
    </>
  );
};







const MyGroupStyled = styled.div`
  .my-group-container {
    align-items: center;
    margin-top: 50px;
    margin-left: 50px;
    box-shadow: 1px 1px 5px 1px black;
    border-radius: 5px;
    padding-left: 20px;
    padding-right: 20px;
    width: 90%;
    height: 100%;
    display: flex;
    background-color: #dedede;
    overflow: hidden;
  }
  .my-group__inner {
    /* border: black solid 1px; */
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 90%;
    height: 90vh;
    box-shadow: 1px 1px 5px 1px gray;
  }
  .my-group__title {
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    background-color: rgb(241, 244, 247);
  }
  .chat-message-box {
    overflow: scroll;

    width: 100%;
    height: 100%;
    background-color: rgb(241, 244, 247);
    &::-webkit-scrollbar {
      border: solid black 1px;
      border-right: 0px;
      border-radius: 2px;
      background-color: rgb(241, 244, 247);
    }
  }
  .chat-message {
    border: 1px solid black;
  }
  .sidebar_container {
    display: flex;
    flex-direction: column;
    align-items: left;
  }

  .avatar {
    text-align: center;
    padding: 20px;
  }
  .chat-groups {
    background-color: rgb(153, 183, 223);
    /* border: 1px solid black; */
    border-radius: 5%;
    text-align: center;
    margin-bottom: 20px;
    padding: 10%;
    color: rgb(255, 255, 255);
  }
  .chat-groups:hover {
    border: 3px solid black;
    transition: 0.3s;
    font-weight: 700;
    color: black;
  }
  .chat-group-name {
    text-align: center;
  }

  .message-others {
    /* border: solid red 1px; */
    padding-left: 30px !important;
    display: flex;
    flex-direction: row;
    text-align: left;
    color: black;
    padding: 10px;
  }
  .chatInput {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 20%;
    background-color: rgb(241, 244, 247);
  }
  .message-nickname {
    font-size: 20px;
    margin-bottom: 7px;
  }
  .memberIng-box {
    margin-right: 10px;
  }
  .memberImg {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-top: 0;
  }
  .init-input {
    height: 600px;
    font-size: 40px;
    color: white;
  }
  .input {
    width: 80%;
    height: 100%;
  }
  .submit-btn {
    width: 19%;
    height: 100%;
    /* color: white; */
  }
  @media (max-width: 920px) {
    .my-group-container {
      margin-left: 0px;
      width: 95%;
    }
  }
  @media (max-width: 813px) {
    .my-group-container {
      flex-direction: column;
    }
    .chat-groups {
      /* position: absolute; */
      height: 100px;
      width: 100px;
      padding: 0px;
      border-radius: 100%;
      margin-right: 30px;
      overflow: hidden;
    }
    .sidebar_container {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      overflow: scroll;
      width: 100%;
      margin-top: 30px;
      /* border: 1px solid */
    }
    .members {
      display: flex;
      flex-direction: row;
      margin-top: 30px;
      overflow: scroll;
    }
    .member {
      margin-right: 30px;
      display: flex;
      flex-direction: column;
    }
  }
`;
export default MyGroup;
