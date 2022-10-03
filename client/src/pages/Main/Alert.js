import SockJS from "sockjs-client";
import StompJs from "stompjs";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Alarm = () => {
  let socketJs = new SockJS("http://www.woodongs.site:8080/ws-stomp");
  let stomp = StompJs.over(socketJs);
  const access_token = localStorage.getItem("access_token");
  console.log(stomp);
  let msg = {
    title: "스터디 신청알림이 왔습니다.",
  };

  useEffect(() => {
    stomp.send(`/pub/study`, { access_token }, JSON.stringify(msg));

    stomp.connect(() => {
      return () => {
        stomp.disconnect(() => {});
      };
    }); // -> 받을때

  }, []);
  stomp.send(`/pub/alarm`, { token : access_token }, JSON.stringify(msg)); //-> 보낼때

  // stompcli.connect(() => {
  //   stompcli.subscribe(`/sub/chatting/room/11`, (data) => {
  //     console.log(data);
  //   });
  // }); // -> 받을때

  return (
    <>
      <Link to="/MyPage">
        <ul>
          <li>🔔 새소식 🔔</li>
          <li>@대한님으로부터 스터디 신청이 있습니다. </li>
          <li>@지훈님으로부터 스터디 신청이 있습니다.</li>
        </ul>
      </Link>
    </>
  );
};

export default Alarm;
