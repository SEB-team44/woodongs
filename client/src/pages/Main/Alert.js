import SockJS from "sockjs-client";
import StompJs from "stompjs";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Alarm = () => {
  // // ec2 ip로 해보기 
  // // let socketJs = new SockJS("http://3.35.188.110:8080/ws-stomp");
  // let socketJs = new SockJS("https://woodongs.site/ws-stomp");


  // let stomp = StompJs.over(socketJs);
  // const access_token = localStorage.getItem("access_token");
  // console.log(stomp);


  // let msg = {
  //   senderId: "4",
  //   senderNickname:"2", 
  //   receiverId: "3",
  //   message: "1",
  // };

  // useEffect(() => {
  //   // stomp.send(`/pub/study`, { token : access_token }, JSON.stringify(msg));

  //   stomp.connect(() => {
  //     return () => {
  //       stomp.disconnect(() => {});
  //     };
  //   }); // -> 받을때

  // }, []);


  // stomp.send(`/app/alarm`, { token : access_token }, JSON.stringify(msg)); //-> 보낼때

  // stomp.connect(() => {
  //   stomp.subscribe(`/sub/alarm/3`, (data) => {
  //     console.log(data);
  //   });
  // }); // -> 받을때

  return (
    <>
    </>
  );
};

export default Alarm;
