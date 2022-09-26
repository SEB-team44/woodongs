import React from "react";
import Button from "@mui/material/Button";
import { UserInfo, UserLogin } from "../../UserContext";
import {useContext } from "react"

const LogOut = () => {
  const { setUserInfo } = useContext(UserInfo);
  const { setIslogin } = useContext(UserLogin);

  const handleLogout = () => {
    localStorage.clear();
    setIslogin(false);
    setUserInfo({});
  };

  return (
    <Button
      onClick={() => handleLogout()}
      className="submit-button"
      variant="contained"
    >
      LogOut
    </Button>
  );
};

export default LogOut;
