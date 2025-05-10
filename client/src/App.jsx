import { React, useEffect, useState } from "react";
import SignupWizard from "./SignupWizard";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./Login";
import Home from "./Home";
import EditProfile from "./Edit-Profile-Component/EditProfile";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { checkAuth } from "./userAuthUtil";
import Navbar from "./Navbar/Navbar.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const userData = await checkAuth();
        setUser(userData);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);
  return (
    <div>
      <BrowserRouter>
        {!loading && user && <Navbar user={user} setUser={setUser}/>}

        {!loading ? (
          <Routes>
            <Route element={<PublicRoute user={user} />}>
              <Route path="/login" element={<Login setUser={setUser}/>} />
              <Route path="/register" element={<SignupWizard />} />
            </Route>

            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/home" element={<Home user={user} />} />
              <Route
                path="/edit-profile"
                element={<EditProfile user={user} setUser={setUser}/>}
              />
            </Route>
          </Routes>
        ) : (
          <div>Loading...</div> 
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
