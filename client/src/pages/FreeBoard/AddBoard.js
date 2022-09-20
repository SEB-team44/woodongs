import React from "react";
import styled from "styled-components";
import Navbar from "../Main/Navbar";
// import {Button} from '@mui/material';
import Button from "@mui/material/Button";

const StyledAddBoard = styled.div`
  .addboard-navbar{
    margin-bottom: 30px;
  }
  .addboard-container {
    display: flex;
    flex-direction: column;
    border: black solid 1px;
    margin-left: 10%;
    margin-right: 10%;
    padding-left: 5%;
  }
  textarea {
    resize: none;
  }
  .addboard-textarea{
    width: 90%;
    margin-bottom: 50px;
  }

  .body-textarea{
    height: 300px;
  }
  .addboard-submit-box{
    
    text-align: center;
  }
`;

const AddBoard = () => {
  return (
    <>
      <StyledAddBoard>
        <section className="addboard-navbar">
          <Navbar />
        </section>
        <section className="addboard-container">
          <section className="addboard-title-box">
            <h1>Title</h1>
            <textarea className="addboard-textarea title-textarea"/>
          </section>

          <section className="addboard-body-box">
            <h1>Body</h1>
            <textarea className="addboard-textarea body-textarea"/>
          </section>

          <section className="addboard-tags-box">
            <h1>Tags</h1>
            <textarea className="addboard-textarea tags-textarea"/>
          </section>
          <section className="addboard-submit-box">
          <Button className="submit-button" variant="contained">
              게시하기
            </Button>
          </section>
        </section>
      </StyledAddBoard>
    </>
  );
};

export default AddBoard;
