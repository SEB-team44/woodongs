import React, { useEffect }  from "react";
import { useContext } from "react";
import { UserLogin } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const Redirect = () => {
  // const navigate = useNavigate();
  // const {setIslogin, isLogin} = useContext(UserLogin);
  // window.Kakao.init("1f167ebda385a31c8b435bfecc9914c3");
  // function kakaoLogin(){
  //   window.Kakao.Auth.login({
  //     scope:"profile_nickname,profile_image, account_email",
  //     success: function(authObj){
  //       console.log(authObj);
  //       window.Kakao.API.request({
  //         url:'/v2/user/me',
  //         success: res => {
  //           const kakao_account = res.kakao_account;
  //           console.log(kakao_account)
            
  //         }
         
  //       }
  //       )
  //     }
  //   })
  //   navigate("/main");
  //   setIslogin(true)
  //   console.log("isLogin")
  // }

  // kakaoLogin()


  const navigate = useNavigate();
  const {setIslogin} = useContext(UserLogin);
  const UrlParams = window.location.search;

  useEffect(()=>{
    const cutToken = (access) => {
      // "&" 만날 때 까지 accessStr에 넣다고
      // access access에서 accessStr을 뺀것을 refreshStr에 할당
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
  
    // const reqOAuthPost = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     withCredentials: true,
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //   body: JSON.stringify({
    //     email: data.get("email"),
    //     password: data.get("password"),
    //     // phoneNumber: data.get("PhoneNumber"),
    //   }),
    // };

    const tokens = cutToken(UrlParams);
    localStorage.setItem("access_token", tokens.access_token);
    localStorage.setItem("refresh_token", tokens.refresh_token);
  
    const check_a_token = localStorage.getItem("access_token"); 
    
    if (check_a_token) {
      // fetch("http://59.16.126.210:8080/member/me",reqOAuthPost)
      // .then(res => res.json())
      // .then(res => console.log(res))
      // .then(res => {
        alert("로그인 성공");
        setIslogin(true);
        return navigate("/main")
      // })


    } else {
      alert("로그인 실패");
      return navigate("/login")
    }
  },[])

 return(
  <>
  <div>여기가 리다이렉트임</div>
  
  </>
 )

};

export default Redirect;
