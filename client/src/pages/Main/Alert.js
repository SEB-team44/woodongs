import React, { useEffect } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { UserInfo } from "../../UserContext";
const StyledAlarm = styled.span`
`;

const Alarm = ({ alarm }) => {
  const {userInfo} = useContext(UserInfo);

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
