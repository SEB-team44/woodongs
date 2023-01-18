import React from "react";
import styled from "styled-components";
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
    credential: "include",
    Authorization: localStorage.getItem("access_token"),
  };

  useEffect(() => {
    const getApplied = () => {
      fetch(`https://api.woodongs.site/study/${id}/admin`, {
        method: "GET",
        headers: header,
      })
        .then((res) => res.json())
        .then((res) => {
          setApplyInfo([...res]);
        })
        .catch((error) => alert(error));
    };
    getApplied();
  }, []);


  const handleApplyAccept = (e, id) => {
    console.log(applyInfo)
    if (applyInfo)
      fetch(`https://api.woodongs.site/study/${id}/accept`, {
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
      }).catch((error)=>{
        alert(error)
      });
  };

  const handleApplyReject = (e, id) => {
    fetch(`https://api.woodongs.site/study/${id}/refuse`, {
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
                <div className="chart-element">
                  직업 <p>{el.memberResponseDto.profile.job}</p>
                </div>
                <div className="chart-element">
                  경력 <p>{el.memberResponseDto.profile.career}</p>
                </div>
                <div className="chart-element">
                  소개 <p>{el.memberResponseDto.profile.introduction}</p>
                </div>
                <div className="chart-element">
                  상태 <p>{el.state}</p>
                </div>

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
