import React from "react";
import "./Home.css";
import Header from "./Header";
import Profile from "./Profile";
import { checkAuth } from "./userAuthUtil";
import { useNavigate } from "react-router";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const verify = async () => {
      try {
        const userData = await checkAuth();
        setUser(userData);
      } catch {
        navigate("/login");
      }
    };
    verify();
  }, []);
  return (
    <main className="main-page-wrapper">
      <div className="main-page-container">
        <Header user={user} />
        <div className="main-page-profile">
          <Profile user={user} />
        </div>
      </div>
    </main>
  );
};

export default Home;
