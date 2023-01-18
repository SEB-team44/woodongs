import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { React } from "react";
import { Button } from "@mui/material";
import styled from "styled-components";
import Navbar from "../Main/Navbar";

const AddStudyStyled = styled.div`
  .add_container {
    align-items: center;
    justify-content: center;
    margin: 50px auto;
    border: 1px solid black;
    border-radius: 20px;
    padding: 30px;
    width: 800px;
  }
  .submit {
    display: flex;
    align-items: center;
    justify-content: center;
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

const EditRecruit = () => {
  //작성한 사람이 수정할 수 있게?? 토큰있는 사람만??
  const access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  //URI 파라미터 가져오기
  const { id } = useParams(); //card.id
  const { card } = useParams(); //card.id
  //게시판 제목, 내용, 카테고리, 헤드카운트
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [headCount, setHeadCount] = useState("");
  const [content, setContent] = useState({});
  const [checkedItems, setCheckedItems] = useState(new Set()); //체크된 요소들
  const [bodyValue, setBodyValue] = useState("");

  //사용자가 직전에 등록한 게시물의 상태를 그대로 보여주기위해
  //컴포넌트가 마운트 되고 uri 파라미터에 해당하는 data를 가져와
  //title,body,category,headcount의 상태를 바꿔줌

  useEffect(()=> {
    setContent(() => {
      return {
        ...content,
        body: bodyValue,
      };
    });
  },[bodyValue, headCount])

  useEffect(() => {
    const getData = () => {
      let reqOption = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          withCredentials: true,
          "Access-Control-Allow-Origin": "*",
          Authorization: access_token,
        },
      };
      fetch(`https://api.woodongs.site/study/${id}`, reqOption)
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .then((result) => {
          setTitle(() => result.title);
          setBody(() => result.body);
          setCategory(() => result.category);
          setHeadCount(() => result.headCount);
        });
    };
    getData();
  }, []);

  const getValue = (e) => {
    const { value } = e.target;
    setContent(() => {
      return {
        ...content,
        title: value,
      };
    });
  };

  const checkHandler = (e) => {
    const { value } = e.target;
    setContent({
      ...content,
      category: value,
    });
  };

  const getHeadValue = (e) => {
    const { value } = e.target;
    setContent(() => {
      return {
        ...content,
        headCount: value,
      };
    });
  };

  const handleBody = (event) => {
    const {value} = event.target
    setBodyValue(() => value);
  };

  const submitButton = () => {
    const access_token = localStorage.getItem("access_token");
    let reqPost = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        credential: "include",
        Authorization: access_token,
      },
      body: JSON.stringify({
        title: content.title,
        body: content.body,
        category: content.category,
        headCount: content.headCount,
      }),
    };

    fetch(`https://api.woodongs.site/study/${id}`, reqPost)
      .then((res) => {
        if (res.ok) {
          alert("스터디가 성공적으로 수정되었습니다 :D");
          navigate(`/study/${id}`);
          return res.json();
        }
      })
      .catch((err) => alert(err));
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

  return (
    <>
      <AddStudyStyled>
        <Navbar />
        <div className="add_container">
          <h2>*스터디명</h2>
          <input
            type="text"
            placeholder={title}
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
                  onChange={(e) => checkHandler(e)}
                />
                <div>{item.name}</div>
              </label>
            ))}      
          </div>

          <h2>*모집인원</h2>
          <h4>❗️3~4명을 추천합니다. (최대 9명, 추후변경가능)</h4>
          <input
            type="text"
            placeholder={headCount}
            size="20"
            onChange={(e) => getHeadValue(e)}
          />
          <h2>*스터디 설명</h2>
          <h4>❗️스터디 참여조건에 대해서 기재해주세요</h4>
          <textarea
            rows="15"
            cols="97"
            placeholder={body}
            value={bodyValue}
            maxLength={2000}
            onChange={(e) => {
              handleBody(e)
            }}
          ></textarea>
          <div className="submit">
            <Button
              className="submit-button"
              variant="contained"
              onClick={(e) => submitButton(e)}
            >
              수정완료
            </Button>
          </div>
        </div>
      </AddStudyStyled>
    </>
  );
};

export default EditRecruit;
