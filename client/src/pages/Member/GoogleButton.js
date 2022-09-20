import React, { useCallback, useEffect } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

const clientId =
  "170618191189 - jq9vil0i4dj6g1ffi2g6893bc3popafp.apps.googleusercontent.com";

const GoogleButton = ({ onSocial }) => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);
  const onSuccess = (response) => {
    console.log(response);
  };

  const onFailure = (response) => {
    console.log(response);
  };
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="구글아이디로 로그인하기"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
};
export default GoogleButton;
