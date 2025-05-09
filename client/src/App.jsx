import { React, useEffect, useState } from "react";
import SignupWizard from "./SignupWizard";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./Login";
import Home from "./Home";
import EditProfile from "./Edit-Profile-Component/EditProfile";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<SignupWizard />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/edit-profile" element={<EditProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
