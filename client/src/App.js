import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Initial from "./Initial";
import Main from "./pages/Main/Main";
import Login from "./pages/Member/Login";
import SignUp from "./pages/Member/SignUp";
import Recruit from "./pages/Recruit/Recruit";
import AddStudy from "./pages/AddStudy";
import MyPage from "./pages/Main/MyPage";
import MyGroup from "./pages/MyGroup";
import FreeBoard from "./pages/FreeBoard/FreeBoard";
import AddBoard from "./pages/FreeBoard/AddBoard";
import SingleBoard from "./pages/FreeBoard/SingleBoard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/" element={<Initial />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/recruit" element={<Recruit />} />
          <Route path="/AddStudy" element={<AddStudy />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/MyGroup" element={<MyGroup />} />
          <Route path="/FreeBoard" element={<FreeBoard/>} />
          <Route path="/AddBoard" element={<AddBoard/>} /> 
          <Route path="/SingleBoard/:id" element={<SingleBoard/>} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
