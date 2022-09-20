import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const StyledSingleBoard = styled.section`
 .singleboard-container{
  height: 80vh;
  width: 80vw;
  margin-top: 5%;
  margin-left: 5%;
  border: 1px solid black;
 }
`

const SingleBoard = () => {
  const [getSingleBoard, setGetSingleBoard] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getBoardList = async () => {
      fetch("http://localhost:3001/board/" + `${id}`)
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setGetSingleBoard(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBoardList();
  }, [getSingleBoard, id]);

  return (
    <>
    <StyledSingleBoard>
    <section className="singleboard-container">
      <div>제목: {getSingleBoard.title}</div>
      <div>내용: {getSingleBoard.body}</div>
      <div>지역: {getSingleBoard.tag}</div>
      <div>댓글</div>
      <div>수정</div>
      <div>삭제</div>
    </section>
    </StyledSingleBoard>
    </>
  );
};

export default SingleBoard;
