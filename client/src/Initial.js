import React from "react";
import { Link } from "react-router-dom";

const Initial = () => {
  return (
    <>
      <div className="logo">
        <Link to={"/login"}>
          <img src={require("../src/img/logo.png")} />
        </Link>
      </div>
    </>
  );
};

export default Initial;
