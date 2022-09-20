import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Initial from "./Initial";
import Main from "./pages/Main/Main";
import Login from "./pages/Member/Login";
import SignUp from "./pages/Member/SignUp";
import Recruit from "./pages/Recruit/Recruit";
import AddStudy from "./pages/Recruit/AddStudy";
import MyPage from "./pages/Main/MyPage";

import FreeBoard from "./pages/FreeBoard/FreeBoard";
import AddBoard from "./pages/FreeBoard/AddBoard";
import SingleBoard from "./pages/FreeBoard/SingleBoard";

import MyGroup from "./pages/Group/MyGroup";
import ChatMessage from "./pages/Group/ChatMessage";
import ChatSideBar from "./pages/Group/ChatSideBar";

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

          <Route path="/FreeBoard" element={<FreeBoard />} />
          <Route path="/AddBoard" element={<AddBoard />} />
          <Route path="/SingleBoard/:id" element={<SingleBoard />} />

          <Route path="/ChatMessage" element={<ChatMessage />} />
          <Route path="/ChatSideBar" element={<ChatSideBar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;