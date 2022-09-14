import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Initial from "./Initial";
import Main from "./pages/Main/Main";
import Login from "./pages/Login";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/main"element={<Main/>}/>
          <Route path="/" element={<Initial />} />
          <Route path="/login" element = {<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
