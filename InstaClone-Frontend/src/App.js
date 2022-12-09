import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import MyFeed from "./Pages/MyFeed/MyFeed";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import Signup from "./Pages/SignUp/Signup";

import { AuthContextProvider } from "./context/Auth";


function App() {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/SignUp" element={<Signup />} />
            <Route path="/MyFeed" element={<MyFeed />} />
            <Route path="/UserProfile" element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>

    </>
  );
}

export default App;
