import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="logincontainer"></div>
      <Link to="/main">
        <button>메인으로 이동</button>
      </Link>
    </>
  );
};
export default Login;
