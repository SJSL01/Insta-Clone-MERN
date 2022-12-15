import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import Signup from "./Pages/SignUp/Signup";
import { ToastContextProvider } from "./context/Toast";
import { AuthContextProvider } from "./context/Auth";
import Messages from "./Pages/Messenger/Messenger";
import Layout from "./Components/Layout/Layout";



function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContextProvider>
          <AuthContextProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/SignUp" element={<Signup />} />
                <Route path="/UserProfile" element={<ProfilePage />} />
                <Route path="/messages" element={<Messages />} />
              </Routes>
            </Layout>
          </AuthContextProvider>
        </ToastContextProvider>
      </BrowserRouter>

    </>
  );
}

export default App;
