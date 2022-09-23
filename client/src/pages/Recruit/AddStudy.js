import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Main/Navbar";
// import Checkbox from "@mui/material/Checkbox";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";

const AddStudyStyled = styled.div`
  .add_container {
    align-items: center;
    justify-content: center;
    margin: 50px auto;
    border: 1px solid black;
    border-radius: 50px;
    padding: 30px;
    width: 800px;
  }
  .submit {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .submit-button {
    /* background-color: #6787f6; */
  }
  .form-group {
    display: inline-block;
    width: 500px;
    line-height: 50px;
  }
  textarea {
    resize: none;
  }
  .innerBox {
    display: flex;
    margin-right: 10px;
  }
  .checkbox {
    display: flex;
    align-items: center;
    margin: 10px;
  }
`;

const AddStudy = () => {
  const navigate = useNavigate();
  const [bodyValue, setBodyValue] = useState("");
  const [headCountValue, setHeadCountValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [content, setContent] = useState({});
  const submitButton = () => {
    const access_token = localStorage.getItem("access_token");
    let reqPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
        "Access-Control-Allow-Origin": "*",
        Authorization: access_token,
      },
      body: JSON.stringify({
        title: content.title,
        body: content.body,
        category: content.category,
        headCount: content.headCount,
      }),
    };
    //대한님 59.16.126.210:8080
    //지훈님 14.6.86.98:8080
    // fetch(`http://59.16.126.210:8080/study/${content.memberId}/recruit`, reqPost)
    fetch(`http://59.16.126.210:8080/study/recruit`, reqPost)
      .then((res) => {
        if (res.ok) {
          // console.log(content.title, content.body);
          // console.log(res.json());
          alert("새로운 스터디가 성공적으로 등독되었습니다 :D");
          navigate(`/main`);
          return res.json();
        }
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const getValue = (e) => {
    // e.preventDefault();
    const { value } = e.target;
    console.log(e.target.name);
    console.log("value", value);
    setContent({
      ...content,
      title: value,
    });
  };
  const getHeadValue = (e) => {
    const { value } = e.target;
    console.log(e.target.headCount);
    console.log("headcount", value);
    setContent({
      ...content,
      headCount: value,
    });
  };
  const CATEGORY_LIST = [
    { id: 0, name: "기획 & PO" },
    { id: 1, name: "디자인 & UX" },
    { id: 2, name: "프론트엔드" },
    { id: 3, name: "백엔드" },
    { id: 4, name: "취업" },
    { id: 5, name: "어학" },
    { id: 6, name: "시험 & 고시" },
    { id: 7, name: "기타" },
  ];
  const [isChecked, setIsChecked] = useState(false); //체크여부
  const [checkedItems, setCheckedItems] = useState(new Set()); //체크된 요소들

  const checkHandler = (e) => {
    // setIsChecked(!isChecked);
    // checkedItemHandler(target.parentNode, target.value, target.checked);
    const { value } = e.target;
    console.log(e.target.category);
    console.log("category", value);
    setContent({
      ...content,
      category: value,
    });
  };
  const checkedItemHandler = (box, id, isChecked) => {
    if (isChecked) {
      //체크 되었을때
      checkedItems.add(id); //체크 시 삽입
      setCheckedItems(checkedItems); //체크 요소 넣어주기
    } else if (!isChecked && checkedItems.has(id)) {
      //체크가 안되었고, id가 있을때 (2번클릭시)
      checkedItems.delete(id); //두번체크 시 삭제
      setCheckedItems(checkedItems);
    }
    return checkedItems;
  };

  return (
    <>
      <AddStudyStyled>
        <Navbar />
        <div className="add_container">
          <h2>*스터디명</h2>
          <input
            type="text"
            placeholder="3~20글자로 적어주세요. 예) 주말 공부 스터디"
            size="100"
            onChange={(e) => getValue(e)}
          />
          <h2>*스터디 분야</h2>
          <h4>❗️아래 분야 중 한가지를 선택해주세요.</h4>
          <div className="checkbox">
            {CATEGORY_LIST.map((item) => (
              <label key={item.id} className="innerBox">
                <input
                  type="checkbox"
                  value={item.name}
                  onChange={
                    (e) => checkHandler(e)
                    // ,(event) => {
                    //   let category = event.target.value;
                    //   setCategoryValue(category);
                    //   setContent({
                    //     category: categoryValue,
                    //   });
                    //   console.log(categoryValue);
                    // }
                  }
                />
                <div>{item.name}</div>
              </label>
            ))}
            {/* {console.log(target.parentNode, target.value, target.checked)}; */}
            {console.log(checkedItems)}
          </div>

          <h2>*모집인원</h2>
          <h4>❗️3~4명을 추천합니다. (최대 9명, 추후변경가능)</h4>
          <input
            type="text"
            placeholder="숫자만 적어주세요. "
            size="20"
            onChange={(e) => getHeadValue(e)}
          />
          <h2>*스터디 설명</h2>
          <h4>❗️스터디 참여조건에 대해서 기재해주세요</h4>
          <textarea
            rows="15"
            cols="97"
            placeholder="내용을 입력해주세요."
            value={bodyValue}
            onChange={(event) => {
              let data = event.target.value;
              setBodyValue(data);
              setContent({
                ...content,
                body: bodyValue,
              });
              console.log(bodyValue);
            }}
          >
            ● 스터디 목표 및 진행방식 [목표] : ( 예: 제이쿼리를 마스터하고자
            합니다) [진행방식] : (예: 매주마다 다음주의 목표를 설정하고, 이에
            대한 공부 후 실제 프로토타입) [장소/횟수] : (예: 정기적으로 오프라인
            주말 1회 혹은 zoom 1회 토론 등) [기간] : (예 : 3달 정도 진행하고자
            합니다) ● 참여 조건 [지식수준] : (예 :해당 언어에 대한 지식이 조금
            있으셨으면 합니다. ) [참여회비] (예 : 매 모임마다 1만원의 회비가
            있습니다) [기타] ( 예: 인천 거주하시는 분이시면 더욱 좋겠습니다)
          </textarea>
          <div className="submit">
            <Button
              className="submit-button"
              variant="contained"
              onClick={(e) => submitButton(e)}
            >
              작성완료
            </Button>
          </div>
        </div>
      </AddStudyStyled>
    </>
  );
};
export default AddStudy;
