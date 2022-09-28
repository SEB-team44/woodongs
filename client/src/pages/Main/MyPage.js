import React, { useEffect } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "antd";

import { useState, useRef, useContext } from "react";
import { UserInfo } from "../../UserContext";
import LogOut from "../Member/Logout";

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
  .avatorimg {
    height: 20px;
    width: 20px;
  }
  .user_info {
    display: flex;
    flex-direction: column;
    width: 187px;
    justify-content: center;
    text-align: center;
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
  const { userInfo, setUserInfo } = useContext(UserInfo);
  const [file, setFile] = useState();
  const [changeInfo, setChangeInfo] = useState({
    job: "직무를 입력해 주세요",
    career: "경력을 입력해 주세요",
    introduce: "자기소개를 해주세요",
  });
  const [Image, setImage] = useState(userInfo.profileImageUrl);
  const [isEdit, setIsEdit] = useState(false);
  const fileInput = useRef(null);
  const access_token = localStorage.getItem("access_token");
  const header = {
    "Content-Type": "application/json",
    Accept: "application/json",
    withCredentials: true,
    "Access-Control-Allow-Origin": "*",
    Authorization: access_token,
  };

  //사용자 정보가 바뀌면 get 받아오기
  useEffect(() => {
    const getMyPageInfo = async () => {
      fetch("http://3.35.188.110:8080/member/me", {
        headers: header,
      })
        .then((res) => res.json())
        .then((res) => {
          setUserInfo({ ...res });
        });
    };

    getMyPageInfo();
  }, []);

  //edit아이콘을 클릭하면 편집모드로 전환
  const handleEdit = () => {
    setIsEdit(true);
  };

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
    if (e.target.className === "edit-introduce edit-infos") {
      setChangeInfo({
        ...changeInfo,
        introduce: e.target.value,
      });
      console.log(changeInfo);
      return changeInfo;
    }
  };

  const handleDoneEdit = () => {
    // 바뀐부분 patch요청 보내기

    const PatchImgChanges = async () => {
      //   fetch("http://3.35.188.110:8080/member/imageupload", {
      //     method: "POST",
      //     headers: header,
      //     body: JSON.stringify({
      //       images: Image,
      //     }),
      //   }).then((res) => {
      //    console.log(res);
      //   }). catch((error) => {
      //     console.log(error);
      //   })
    };

    const PatchInfoChanges = async () => {
      fetch("http://3.35.188.110:8080/member/profile", {
        method: "PATCH",
        headers: header,
        body: JSON.stringify({
          job: changeInfo.job,
          career: changeInfo.career,
          introduction: changeInfo.introduce,
        }),
      })
        .then((res) => {
          console.log(res.status);
        })
        .catch((error) => console.log(error));
    };

    PatchInfoChanges();
    // PatchImgChanges();
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
    formData.append("file", e.target.files[0]);
    console.log(e.target.files[0]);
    // 서버의 upload API 호출
    const res = fetch("http://3.35.188.110:8080/member/imageupload", {
      method: "POST",
      headers: header,
      images: formData,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(res);

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
                  <input
                    type="file"
                    accept="image/jpg,image/png,image/jpeg"
                    name="profile_img"
                    onChange={(e) => onImgChange(e)}
                    ref={fileInput}
                  />
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
                  >
                    {userInfo.nickName}
                  </textarea>
                </>
              ) : (
                <div className="name">{userInfo.nickName}</div>
              )}
            </div>

            <div className="mypage_downcontent">
              User info
              {isEdit ? (
                <div className="user_info">
                  <div>
                    <textarea
                      className="edit-job edit-infos"
                      onChange={(e) => handleEditContents(e)}
                      value={changeInfo.job}
                    >
                      직무 : 웹 프론트엔드
                    </textarea>
                  </div>
                  <textarea
                    className="edit-career edit-infos"
                    onChange={(e) => handleEditContents(e)}
                    value={changeInfo.career}
                  >
                    경력 : 0년차
                  </textarea>
                  <textarea
                    className="edit-introduce edit-infos"
                    onChange={(e) => handleEditContents(e)}
                    value={changeInfo.introduce}
                  >
                    소개 : 열심히하겠습니다!
                  </textarea>
                  <button onClick={() => handleDoneEdit()}>완료</button>
                </div>
              ) : (
                <div className="user_info">
                  <div className="job">{changeInfo.job}</div>
                  <div className="career">{changeInfo.career}</div>
                  <div className="introduce">{changeInfo.introduce}</div>
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
