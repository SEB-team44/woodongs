import React from "react";
import styled, { ThemeConsumer } from "styled-components";
import { useEffect, useState } from "react";

const StyledManage = styled.div`
  .chart-element {
    border: solid 1px black;
    width: 100%;
  }
  .chart-container {
    display: flex;
    flex-direction: row;
  }
  .avatarImg {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
`;

const Manage = ({ id }) => {
  const [applyInfo, setApplyInfo] = useState([]);

  const header = {
    "content-type": "application/json",
    Accept: "application/json",
    withCredentials: true,
    "Access-Control-Allow-Origin": "*",
    Authorization: localStorage.getItem("access_token"),
  };

  useEffect(() => {
    const getApplied = () => {
      fetch(`https://www.woodongs.site/study/${id}/admin`, {
        method: "GET",
        headers: header,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("applyInfo", res);
          setApplyInfo([...res]);
        })
        .catch((error) => console.log(error));
    };
    getApplied();
  }, []);
  const handleApplyAccept = (e, id) => {
    if (applyInfo)
      fetch(`https://www.woodongs.site/study/${id}/accept`, {
        method: "POST",
        headers: header,
      }).then((res) => {
        if (res.ok) {
          alert("신청이 수락되었습니다.");
          const filtered = applyInfo.filter((el) => {
            return el.studyApplyId !== id;
          });
          setApplyInfo([...filtered]);
        }
      });
  };

  const handleApplyReject = (e, id) => {
    fetch(`https://www.woodongs.site/study/${id}/refuse`, {
      method: "POST",
      headers: header,
    }).then((res) => {
      if (res.ok) {
        alert("신청이 거절되었습니다.");
        const filtered = applyInfo.filter((el) => {
          return el.studyApplyId !== id;
        });
        setApplyInfo([...filtered]);
      }
    });
  };

  return (
    <>
      <StyledManage>
        {applyInfo &&
          applyInfo.map((el) => {
            return (
              <section key={el.studyApplyId} className="chart-container">
                <div className="chart-element">
                  <img
                    src={el.memberResponseDto.profileImageUrl}
                    className="avatarImg"
                  />{" "}
                  {el.memberResponseDto.nickName}
                </div>
                {/* {el.memberResponseDto.profile.job } */}
                <div className="chart-element">직업 :</div>
                {/* {el.memberResponseDto.profile.career } */}
                <div className="chart-element">경력 :</div>
                {/* {el.memberResponseDto.profile.introduction } */}
                <div className="chart-element">소개 : </div>
                <div className="chart-element">상태 : {el.state}</div>

                {el.state === "WAITING" ? (
                  <>
                    <div className="request-button">
                      <button
                        onClick={(e) => handleApplyAccept(e, el.studyApplyId)}
                      >
                        수락
                      </button>
                      <button
                        onClick={(e) => handleApplyReject(e, el.studyApplyId)}
                      >
                        거절
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="request-button">
                    <button> 완료 </button>
                  </div>
                )}
              </section>
            );
          })}
      </StyledManage>
    </>
  );
};
export default Manage;
