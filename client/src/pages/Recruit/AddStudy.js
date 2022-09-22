import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Main/Navbar";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
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
`;
const CATEGORY_LIST = [
  { id: 0, data: "기획 & PO" },
  { id: 1, data: "디자인 & UX" },
  { id: 2, data: "프론트엔드" },
  { id: 3, data: "백엔드" },
  { id: 4, data: "취업" },
  { id: 5, data: "어학" },
  { id: 6, data: "시험 & 고시" },
  { id: 7, data: "기타" },
];

const AddStudy = () => {
  const [checkedList, setCheckedList] = useState([]); //데이터를 넣을 빈배열
  const onCheckedElement = (checked, item) => {
    //onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기
    if (checked) {
      setCheckedList([...checkedList]);
    } else if (!checked) {
      setCheckedList(checkedList.filter((el) => el !== item));
    }
  };
  // 체크박스 체크 된 부분 어떻게 가져올지..하던부분
  const [checked,setChecked] = useState(false)
  // const handleAgree = (event)=>{
  //   setChecked(event.target.checked)
  // }
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // }
  // const issueList = () => {
  //   const issue = [...Array(10).keys()];
  // };

  // const checkHandler = ({ target }) => {
  //   setChecked(!checked);
  //   checkedItemHandler(issue.id, target.checked);
  // };

  const [checkedItems, setCheckedItems] = useState(new Set());
  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
  };
  const navigate = useNavigate();
  const [content, setContent] = useState({
    title: "",
    body: "",
  });

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
        // memberId : id,
        title: content.title,
        body: content.body,
      }),
    };
    //대한님 59.16.126.210:8080
    //지훈님 14.6.86.98:8080
    fetch("59.16.126.210:8080/main", reqPost)
      .then((res) => {
        if (res.ok) {
          // console.log(content.title, content.body);
          // console.log(res.json());
          navigate(`/`);
          return res.json();
        }
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const getValue = (e) => {
    const { name, value } = e.target;
    setContent({
      ...content,
      [name]: value,
    });
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
            onChange={getValue}
          />
          <h2>*스터디 분야</h2>
          <h4>❗️아래 분야 중 한가지를 선택해주세요.</h4>
          <div className="checkbox">
            <FormGroup className="form-group">
              <FormControlLabel control={<Checkbox />} label="기획 & PO" />
              <FormControlLabel control={<Checkbox />} label="디자인 & UX" />
              <FormControlLabel control={<Checkbox />} label="프론트엔드" />
              <FormControlLabel control={<Checkbox />} label="백엔드" />
              <FormControlLabel control={<Checkbox />} label="취업" />
              <FormControlLabel control={<Checkbox />} label="어학" />
              <FormControlLabel control={<Checkbox />} label="시험 & 고시" />
              <FormControlLabel control={<Checkbox />} label="기타" />
            </FormGroup>
          </div>

          <h2>*모집인원</h2>
          <h4>❗️3~4명을 추천합니다. (최대 9명, 추후변경가능)</h4>
          <input type="text" placeholder="숫자만 적어주세요. " size="20" />
          <h2>*스터디 설명</h2>
          <h4>❗️스터디 참여조건에 대해서 기재해주세요</h4>
          <textarea
            rows="15"
            cols="97"
            placeholder="내용을 입력해주세요."
            data=""
            onChange={(event) => {
              const data = event.target.value;
              this.setContent({
                ...content,
                content: data,
              });
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
