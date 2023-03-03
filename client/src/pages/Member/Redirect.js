import React, { useEffect } from "react";
import { useContext } from "react";
import { UserLogin } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../UserContext";

const Redirect = () => {
  const navigate = useNavigate();
  const { setIslogin } = useContext(UserLogin);
  const { setUserInfo } = useContext(UserInfo);
  const UrlParams = window.location.search;
  const getlat = localStorage.getItem("latitude");
  const getlong = localStorage.getItem("longitude");

  useEffect(() => {
    const cutToken = (access) => {
      // "&" 만날 때 까지 accessStr에 할당한다음
      // access에서 accessStr을 뺀것을 refreshStr에 할당
      let accessStr = "";
      let refreshStr = "";
      let i = 0;
      while (access[i] !== "&") {
        accessStr = accessStr + access[i];
        i++;
      }
      refreshStr = access.replace(accessStr, "");
      return {
        access_token: accessStr.replace("?access=", ""),
        refresh_token: refreshStr.replace("&refresh=", ""),
      };
    };

    const reqOAuthPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        latitude: getlat,
        longitude: getlong,
      }),
    };

    const tokens = cutToken(UrlParams);
    localStorage.setItem("access_token", tokens.access_token);
    localStorage.setItem("refresh_token", tokens.refresh_token);

    const check_a_token = localStorage.getItem("access_token");

    if (check_a_token) {
      reqOAuthPost.headers["Authorization"] = check_a_token;
      fetch("https://api.woodongs.site/member/locate", reqOAuthPost).then(
        (res) => {
          fetch("https://api.woodongs.site/member/me", {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              credentials: "include",
              Authorization: check_a_token,
            },
          })
            .then((res) => res.json())
            .then((res) => {
              setUserInfo({ ...res });
            })
            .then((res) => {
              alert("로그인 성공");
              setIslogin(true);
              if (getlat && getlong) {
                return navigate("/main");
              } else {
                return navigate("/EntireMain");
              }
            })
            .catch((error) => {
              alert("로그인 실패");
            });
        }
      );
    } else {
      alert("로그인 실패");
      return navigate("/login");
    }
  }, []);

  return (
    <>
      <div>Redirect Page</div>
    </>
  );
};

export default Redirect;