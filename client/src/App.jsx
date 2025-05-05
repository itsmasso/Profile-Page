import { useState } from "react";

import SignupWizard from "./SignupWizard"
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./Login";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            element={<SignupWizard />}
          ></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
