import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Initial from "./Initial";
import Main from "./pages/Main/Main";
import Login from "./pages/Member/Login";
import SignUp from "./pages/Member/SignUp";
import Recruit from "./pages/Recruit/Recruit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/" element={<Initial />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/recruit" element={<Recruit/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
