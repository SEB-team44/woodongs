import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Navbar from "../Main/Navbar";
// import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import SockJS from "sockjs-client";
import StompJs from "stompjs";
import { useContext } from "react";
import { UserInfo } from "../../UserContext";
// background-color: #6A74CF;

const MyGroupStyled = styled.div`
  .my-group-container {
    align-items: center;
    margin-left: 50px;
    margin-right: 50px;
    border: 1px solid black;
    border-radius: 20px;
    padding-left: 20px;
    padding-right: 20px;
    width: 90%;
    height: 100%;
    display: flex;
    background-color: #dedede;

    overflow: hidden;
  }
  .my-group__inner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: gray;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 90%;
    height: 90vh;
  }
  .my-group__title {
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    background-color: #dedede;
  }
  .chat-message-box {
    overflow: scroll;
    border: black solid 1px;
    width: 100%;
    height: 100%;
    background-color: rgb(128, 128, 128);
    &::-webkit-scrollbar {
      border: solid black 1.5px;
      border-radius: 2px;
      background-color: #dedede;
    }
  }
  .chat-message {
    border: 1px solid black;
  }
  .sidebar_container {
    flex-direction: column;
    align-items: left;
  }

  .avatar {
    text-align: center;
    padding: 20px;
  }
  .chat-groups {
    border: 1px solid black;
    border-radius: 5%;
    text-align: center;
    margin-bottom: 20px;
  }
  .chat-groups:hover{
    border: 3px solid black;
    transition: 0.3s;
    font-weight: 700;
  }
  .chat-group-name {
    text-align: center;
  }

  .message-others {
    /* border: solid red 1px; */
    display: flex;
    flex-direction: row;
    text-align: left;
    color: white;
    padding: 10px;
  }
  .chatInput {
    display: flex;
    flex-direction: row;
    width: 100%;
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
  }
`;

// 1. 다른 버튼으로 구독할 때, 이미 구독한것이 존재하면 그 구독을 끊고, 버튼 누른 것을 구독한다.
// 2. 동일한 버튼을 2번 이상 연속으로 누르면, 한번만 눌리게 된다.

const MyGroup = () => {
  const { userInfo } = useContext(UserInfo);
  const token = localStorage.getItem("access_token");
  const chatInfo = userInfo.studyResponseDtos;
  const [memberInfo, setmemberInfo] = useState([]);
  const [getStudyId, setGetstudyId] = useState(0);

  //채팅을 받기
  const [getChat, setGetchat] = useState([]);
  const [sendcontent, setSendConetent] = useState("");
  const [subIdArr, setSubIdArr] = useState([]);
  var stomp1 = null;

  let socketJs = new SockJS("http://3.35.188.110:8080/ws-stomp");
  const stomp = StompJs.over(socketJs);
  const access_token = localStorage.getItem("access_token");

  const messagesEndRef = useRef(null);

  // 모든 구독 취소하기
  const subscribeCancle = function () {
    const length = subIdArr.length;
    for (let i = 0; i < length; i++) {
      const sid = subIdArr.pop();
      stomp.unsubscribe(sid.id);
      console.log("============unsubscribeed==========");
    }
  };

  const handleWebsocket = (studyId) => {
    fetch("http://3.35.188.110:8080/study/" + `${studyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        withCredentials: true,
        "Access-Control-Allow-Origin": "*",
        Authorization: access_token,
      },
    })
      .then((res) => res.json())
      .then((res) => setmemberInfo([...res.memberResponseDtos]));

    // 같은 버튼을 클릭하지 않았을 때만 구독해줌.
    if (getStudyId !== studyId) {
      setGetchat([]);
      let socketJs = new SockJS("http://3.35.188.110:8080/ws-stomp");
      const stomp = StompJs.over(socketJs);

      stomp1 = stomp.connect({ token: token }, (frame) => {
        console.log("connecteed" + frame);
        console.log("subArr", subIdArr);

        //존재하는 모든 구독을 끊어줌
        subscribeCancle();

        const subscribeId = stomp.subscribe(
          `/topic/chat/` + studyId,
          function (respoonse) {
            let res = JSON.parse(respoonse.body);
            console.log("resmessage: " + res);
            // chatData.push({ ...res });
            setGetchat((_chat_list) => [..._chat_list, res]);
          }
        );
        setSubIdArr((subIdArr) => {
          return [...subIdArr, { ...subscribeId }];
        });
        console.log(subscribeId);
      });
    }
    setGetstudyId(studyId);
  };

  const pubChatData = () => {
    let msg = {
      senderId: Number(userInfo.memberId),
      senderNickname: userInfo.nickName,
      receiverId: Number(getStudyId),
      message: `${sendcontent}`,
    };

    stomp.send(
      //알람 전송
      `/app/chat`,
      {},
      JSON.stringify(msg)
    );
  };

  const handleChangeContent = (e) => {
    setSendConetent(e.target.value);
  };

  const handlePubChat = (e) => {
    e.preventDefault();
    pubChatData();
    e.target.value = null;
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
            {chatInfo &&
              chatInfo.map((el) => {
                return (
                  <>
                    <div
                      className="chat-groups"
                      key={el.studyId}
                      onClick={(e) => handleWebsocket(el.studyId)}
                    >
                      <div className="avatar">
                        <FontAwesomeIcon icon={faUser} size="2x" />
                      </div>
                      <div className="chat-room-number">
                        {el.studyId}번 채팅방 
                      </div>
                      <div className="chat-group-name">
                        - {el.title} -
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
          <div className="my-group__inner">
            <div className="my-group__title">{getStudyId}번 채팅방 </div>
            <div className="chat-message-box">
              <div>
                {getChat &&
                  getChat.map((el) => {
                    return (
                      <>
                        <div key={el.senderId} className="message-others">
                          <div className="memberIng-box">
                            {memberInfo.map((element) => {
                              console.log(memberInfo);
                              if (element.memberId === el.senderId) {
                                return (
                                  <>
                                    {" "}
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
                              {el.senderNickname}
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
              ) : (
                <>
                  <textarea
                    className="input"
                    placeholder="내용을 입력하세요."
                    onChange={(e) => handleChangeContent(e)}
                    // onKeyPress={handleKeyPress}
                    value={sendcontent}
                  />
                  <button
                    className="submit-btn"
                    onClick={(e) => handlePubChat(e)}
                  >
                    입력
                  </button>
                </>
              )}
            </div>
          </div>
          <div>
            {memberInfo &&
              memberInfo.map((el) => {
                return (
                  <>
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
                  </>
                );
              })}
          </div>
        </div>
      </MyGroupStyled>
    </>
  );
};

export default MyGroup;
