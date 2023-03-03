import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Initial from "./pages/initial/Initial";
import EntireMain from "./pages/Main/EntireMain";
import Main from "./pages/Main/Main";
import Login from "./pages/Member/Login";
import SignUp from "./pages/Member/SignUp";
import Recruit from "./pages/Recruit/Recruit";
import AddStudy from "./pages/Recruit/AddStudy";
import EditRecruit from "./pages/Recruit/EditRecruit";
import MyPage from "./pages/Main/MyPage";
import FreeBoard from "./pages/FreeBoard/FreeBoard";
import AddBoard from "./pages/FreeBoard/AddBoard";
import SingleBoard from "./pages/FreeBoard/SingleBoard";
import MyGroup from "./pages/Group/MyGroup";
import { UserLogin } from "./UserContext";
import { UserInfo } from "./UserContext";
import { IsChat } from "./UserContext";
import Redirect from "./pages/Member/Redirect";
import Manage from "./pages/Recruit/Manage";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const queryClient = new QueryClient();

  const [isLogin, setIslogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isChat, setIsChat] = useState(false);


  return (
    <>
        <IsChat.Provider value={{ isChat, setIsChat }}>
          <UserInfo.Provider value={{ userInfo, setUserInfo }}>
            <UserLogin.Provider value={{ isLogin, setIslogin }}>
            <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                <Routes>
                  <Route path="/EntireMain" element={<EntireMain />} />
                  <Route path="/main" element={<Main />} />
                  <Route path="/" element={<Initial />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/SignUp" element={<SignUp />} />
                  <Route path="/study/:id" element={<Recruit />} />
                  <Route path="/study/recruit" element={<AddStudy />} />
                  <Route path="/EditRecruit/:id" element={<EditRecruit />} />
                  <Route path="/MyPage" element={<MyPage />} />
                  <Route path="/MyGroup" element={<MyGroup />} />
                  <Route path="/FreeBoard" element={<FreeBoard />} />
                  <Route path="/AddBoard" element={<AddBoard />} />
                  <Route path="/SingleBoard/:id" element={<SingleBoard />} />
                  <Route path="/Redirect" element={<Redirect />} />
                  <Route path="/Manage" element={<Manage />} />
                </Routes>
              </BrowserRouter>
              <ReactQueryDevtools/>
              </QueryClientProvider>
            </UserLogin.Provider>
          </UserInfo.Provider>
        </IsChat.Provider>
    </>
  );
}

export default App;
