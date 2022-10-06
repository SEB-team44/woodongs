import React, { useEffect } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
// import { Avatar } from "antd";

import { useState, useRef, useContext } from "react";
import { UserInfo } from "../../UserContext";
import LogOut from "../Member/Logout";

import axios from "axios";

const MyPageStyled = styled.div`
  .mypage_content {
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 50px auto;
    border: 1px solid black;
    border-radius: 50px;
    padding: 30px;
    width: 800px;
  }
  .mypage_button {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .mypage_downcontent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
  }
  .avatarimg {
    height: 150px;
    width: 150px;
    border-radius: 50%;
  }
  .user_info {
    margin: 0;
    display: flex;
    flex-direction: column;
    width: 200px;
    justify-content: center;
    text-align: center;
    align-items: center;
  }
  li,
  a {
    text-decoration: none;
    list-style: none;
  }
`;

//이미지 업로드 의사코드
//1. 회원정보를 가져와서 이미지의 기본값을 그 이미지로 받아온다.
//2  이미지를 업로드하면, 바뀐 이미지를 post해주고, 바뀐이미지를 기본이미지로 대체한다.
//3  다음번에 리로드할 때에는 회원정보의 이미지를 출력한다.

//마이페이지 의사코드
// 1. 버튼을 누르면 textArea와 그것을 전송하는 버튼이 보이게 한다.
// 2. textArea필드에 값을 입력하고 전송하면
// 3. 회원정보를 수정하는 post요청을 보내고
// 4. post가 성공하면 get요청을 통해 회원정보를 받아와 출력한다.

const MyPage = () => {
  const access_token = localStorage.getItem("access_token");
  const [isEdit, setIsEdit] = useState(false);

  // 회원 관련 state
  const { userInfo, setUserInfo } = useContext(UserInfo);
  const [reRender, setRerender] = useState(false);
  const [changeInfo, setChangeInfo] = useState(
    {
      nickName: userInfo.nickName,
      job: userInfo.profile.job,
      career: userInfo.profile.career,
      introduction: userInfo.profile.introduction,
    } | {}
  );

  // 이미지 관련 state
  const [file, setFile] = useState();
  const [Image, setImage] = useState(userInfo.profileImageUrl);
  const fileInput = useRef(null);

  const header = {
    "Content-Type": "application/json",
    Accept: "application/json",
    withCredentials: true,
    "Access-Control-Allow-Origin": "*",
    Authorization: access_token,
  };

  //사용자 정보가 바뀌면 get 받아오기
  useEffect(() => {
    const getMemberInfo = async () => {
      // {이름 , 인덱스, 소속된 스터디, 프로필{job, career, introduction}, 등급 }
      fetch("https://www.woodongs.site/member/me", {
        headers: header,
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log("me", res);
          setChangeInfo((changeInfo) => {
            return {
              ...changeInfo,
              nickName: res.nickName,
            };
          });
        })
        .then(() => {
          fetch("https://www.woodongs.site/member/profile", {
            headers: header,
          })
            .then((res) => res.json())
            .then((res) => {
              // console.log("profile", res);
              setChangeInfo({ ...changeInfo, ...res });
              setUserInfo((userInfo) => {
                return { ...userInfo };
              });
            });
        });
    };
    // {job, career, introduction}
    // const getMyPageInfo = async () => {};
    // getMyPageInfo();
    getMemberInfo();
  }, [reRender]);

  //edit아이콘을 클릭하면 편집모드로 전환
  const handleEdit = () => {
    setIsEdit(true);
  };

  //클릭하면 편집모드 취소
  const handleCancelEdit = () => {
    setIsEdit(false);
  };

  //회원정보 수정 handler
  const handleEditContents = (e) => {
    // e.preventDefault();
    if (e.target.className === "edit-nickname edit-infos") {
      setChangeInfo({
        ...changeInfo,
        nickName: e.target.value,
      });
      console.log(changeInfo);
      return changeInfo;
    }

    if (e.target.className === "edit-job edit-infos") {
      setChangeInfo({
        ...changeInfo,
        job: e.target.value,
      });
      console.log(changeInfo);
      return changeInfo;
    }

    if (e.target.className === "edit-career edit-infos") {
      setChangeInfo({
        ...changeInfo,
        career: e.target.value,
      });
      console.log(changeInfo);
      return changeInfo;
    }
    if (e.target.className === "edit-introduction edit-infos") {
      setChangeInfo({
        ...changeInfo,
        introduction: e.target.value,
      });
      console.log(changeInfo);
      return changeInfo;
    }
  };

  const handleDoneEdit = () => {
    const PatchNickName = async () => {
      fetch("https://www.woodongs.site/member", {
        method: "PATCH",
        headers: header,
        body: JSON.stringify({
          nickName: changeInfo.nickName,
        }),
      })
        .then((res) => {
          if (res.ok) {
            console.log("이름 수정 성공");
          }
          return res.json()})
        .then((res) => {
          console.log(res)
        })
        .then(() => {
          fetch("https://www.woodongs.site/member/profile", {
            method: "PATCH",
            headers: header,
            body: JSON.stringify({
              job: changeInfo.job,
              career: changeInfo.career,
              introduction: changeInfo.introduction,
            }),
          })
            // .then((res) => res.json())
            .then((res) => {
              if (res.ok) {
                console.log("소개 수정 성공", res.status);
                setUserInfo((userInfo) => {
                  return {
                    ...userInfo,
                    nickName: changeInfo.nickName,
                    profile: {
                      job: changeInfo.job,
                      career: changeInfo.career,
                      introduction: changeInfo.introduction,
                    },
                    profileImageUrl: Image,
                  };
                });
              }
              // 여기서 setmemeber의 인포를 업데이트를 해준다.

              setRerender(!reRender);
            })
            .catch((error) =>
              console.log(`${error}, 정보를 수정할 수 없습니다.`)
            );
        })
        .catch((error) => console.log(`${error}, 정보를 수정할 수 없습니다.`));
    };

    PatchNickName();
    setIsEdit(false);
  };

  const onImgChange = async (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setFile({ ...e.target.files[0] });
    } else {
      //업로드 취소할 시
      if (userInfo.profileImageUrl) {
        return userInfo.profileImageUrl;
      } else {
        return require("../../../src/img/avatar.png");
      }
    }

    const formData = new FormData();
    formData.append("images", e.target.files[0]);
    console.log(e.target.files[0]);
    // 서버의 upload API 호출
    axios({
      // baseURL: "https://59.16.126.210:8080/member/imageupload",
      url: "https://www.woodongs.site/member/imageupload",
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        withCredentials: true,
        "Access-Control-Allow-Origin": "*",
        Authorization: access_token,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(response.status, "업로드 성공");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <MyPageStyled>
        <Navbar />
        <div className="mypage_container">
          <div className="mypage_content">
            <div className="mypage_upcontent">
              <div className="mypage_photo">
                {/* <Avatar
                  className="avatarimg"
                  src={Image}
                  style={{ margin: "20px" }}
                  size="small"
                /> */}
                <img
                  className="avatarimg"
                  src={
                    userInfo.profileImageUrl
                      ? userInfo.profileImageUrl
                      : require("../../../src/img/avatar.png")
                  }
                />
                {isEdit ? (
                  <div>
                    <input
                      type="file"
                      accept="image/jpg,image/png,image/jpeg"
                      name="profile_img"
                      onChange={(e) => onImgChange(e)}
                      ref={fileInput}
                    />
                  </div>
                ) : null}
              </div>
              <div className="mypage_button">
                <div className="checknumber">
                  <button>번호인증</button>
                </div>
                <div className="mypage_update">
                  <Button
                    onClick={() => handleEdit()}
                    style={{ display: `${isEdit ? "none" : ""}` }}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
                </div>
              </div>
              {isEdit ? (
                <>
                  <textarea
                    className="edit-nickname edit-infos"
                    onChange={(e) => handleEditContents(e)}
                    value={changeInfo.nickName}
                    placeholder="nickName"
                  ></textarea>
                </>
              ) : (
                <div className="name">
                  <h1>{userInfo.nickName}</h1>
                </div>
              )}
            </div>

            <div className="mypage_downcontent">
              {isEdit ? (
                <div className="user_info">
                  <div>
                    <textarea
                      className="edit-job edit-infos"
                      onChange={(e) => handleEditContents(e)}
                      value={changeInfo.job}
                      placeholder="job"
                    ></textarea>
                  </div>
                  <div>
                    <textarea
                      className="edit-career edit-infos"
                      onChange={(e) => handleEditContents(e)}
                      value={changeInfo.career}
                      placeholder="career"
                    ></textarea>
                  </div>
                  <div>
                    <textarea
                      className="edit-introduction edit-infos"
                      onChange={(e) => handleEditContents(e)}
                      value={changeInfo.introduction}
                      placeholder="introduction"
                    ></textarea>
                  </div>
                  <div>
                    <button onClick={() => handleDoneEdit()}>완료</button>
                    <button onClick={() => handleCancelEdit()}>취소</button>
                  </div>
                </div>
              ) : (
                <div className="user_info">
                  <div className="info job">{changeInfo.job}</div>
                  <div className="info career">{changeInfo.career}</div>
                  <div className="info introduction">
                    {changeInfo.introduction}
                  </div>
                </div>
              )}
            </div>
            <Link to="/Login">
              <LogOut />
            </Link>
          </div>
        </div>
      </MyPageStyled>
    </>
  );
};

export default MyPage;
