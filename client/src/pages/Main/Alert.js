import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledAlarm = styled.span`
  .alarm-list{
  }


`;

const Alarm = ({ alarm }) => {
  return (
    <>
      <StyledAlarm>
        <span className="alarm-list">
          {alarm.map((el, key) => {
            return (
              <>
                <p key={key}>- {el}님께서 스터디를 신청하였습니다.</p>
              </>
            );
          })}
        </span>
      </StyledAlarm>
    </>
  );
};

export default Alarm;
