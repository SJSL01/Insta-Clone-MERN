import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ToastContext from "./Toast";

const AuthContext = createContext("");


export const AuthContextProvider = ({ children }) => {


    const { toast } = useContext(ToastContext)

    const [user, setUser] = useState(null)

    const navigate = useNavigate()
    const location = useLocation()


    useEffect(() => {
        isLoggedIn()
    }, [])


    const isLoggedIn = async () => {
        try {

            const headers = { "Authorization": `Bearer ${sessionStorage.getItem("token")}` }

            const result = await axios.post("http://localhost:3010/auth/isLoggedIn", null, { headers })

            // console.log(result.data.user[0]);
            setUser(await result.data.user[0])

            if(location.pathname === "/" || location.pathname === "/signup"){
                navigate("/Home");
            }else{
                navigate(location.pathname)
            }


        } catch (error) {
            navigate("/")
            toast.error("login first")
        }
    }


    const login = async (userData) => {
        if (sessionStorage.getItem("token")) {
            navigate("/Home")
        }

        try {

            const result = await axios.post("http://localhost:3010/auth/login", userData)
            setUser(result.data.getUser[0])
            console.log(user);
            sessionStorage.setItem('token', result.data.token)
            navigate("/Home", { replace: true })

        } catch (error) {
            toast(error.response.data.error);
            console.log(error.response.data.error);
        }
    }
    const signup = async (userData) => {

        try {

            const result = await axios.post("http://localhost:3010/auth/signup", userData)
            console.log(user);
            toast.success("registered successfully")
            // sessionStorage.setItem('token',result.data.token)

        } catch (error) {
            toast.error(error.response.data.error)
            console.log(error.response.data);
        }
    }
    





    return (
        <AuthContext.Provider value={{ login, signup, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;