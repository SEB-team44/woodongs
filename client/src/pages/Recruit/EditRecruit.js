import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

const EditeRecruit = () => {
  //작성한 사람이 수정할 수 있게?? 토큰있는 사람만??
  const access_token = useSelector((state) => state.accessToken);
  const navigate = useNavigate();
  //URI 파라미터 가져오기
  const { id } = useParams(); //card.id
  const { card } = useParams(); //card.id
  //게시판 제목, 내용, 카테고리, 헤드카운트
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [headCount, setHeadCount] = useState("");

  //사용자가 직전에 등록한 게시물의 상태를 그대로 보여주기위해
  //컴포넌트가 마운트 되고 uri 파라미터에 해당하는 data를 가져와
  //title,body,category,headcount의 상태를 바꿔줌
  useEffect(() => {
    const getData = () => {
      let reqOption = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          withCredentials: true,
          "Access-Control-Allow-Origin": "*",
          Authorization: access_token,
        },
      };
      fetch(`http://3.35.188.110:8080/study/${id}`, reqOption)
        .then((res) => res.json())
        .then((data) => {
          console.log("content", data);
          return data;
        });
    };
    getData().then((result) => {
      setTitle(result.title);
      setBody(result.body);
      setCategory(result.category);
      setHeadCount(result.headCount);
    });
  }, []);

  const canSubmit = useCallback(() => {
    return body !== "" && title !== "" && category !== "" && headCount !== "";
  }, [title, body, category, headCount]);

  const handleSubmit = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      formData.append("category", category);
      formData.append("headCount", headCount);
      //수정할 땐 card.id 보내자
      formData.append("id", id);
      await card.put("/study/card", formData);
      window.alert("수정이 완료되었습니다. :-D");
      //이전 페이지로 돌아가기
      window.location.href = `/card/edite`;
    } catch (err) {
      //서버에서 받은 에러 메시지 출력
      console.log("오류발생!");
    }
  }, [canSubmit]);

  return (
    <div className="addRecruit-wrapper">
      <div className="addRecruit-header">게시물 수정하기</div>
      <div className="submitButton">
        {canSubmit() ? (
          <Button
            onClick={handleSubmit}
            className="success-button"
            // variant="outlined"
          >
            수정하기
          </Button>
        ) : (
          <Button className="disable-button" variant="outlined" size="large">
            제목과 내용을 모두 입력하세요
          </Button>
        )}
      </div>
      <div className="addRecruit-body">
        <textarea
          setTitle={setTitle}
          setBody={setBody}
          title={title}
          body={body}
        />
      </div>
    </div>
  );
};

export default EditeRecruit;
