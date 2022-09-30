import React from "react";
import styled from "styled-components";

const StyledManage = styled.div`
  .chart-element{
    border: solid 1px black;
    width : 100%;
  }
  .chart-container{
    display: flex;
    flex-direction: row;
  }
`

const Manage = () => (
  <> <StyledManage>
    <section className = "chart-container">
      <div className="chart-element">이름</div>
      <div className="chart-element">직업</div>
      <div className="chart-element">경력</div>
      <div className="chart-element">소개</div>
      <div className="request-button">
        <button>수락</button>
        <button>거절</button>
      </div>
    </section>
    </StyledManage>
  </>
);

export default Manage;
