import { createContext, useState } from "react";

const AuthContext = createContext("");


export const AuthContextProvider = ({ children }) => {


    const [name, setName] = useState("SJSL")




    return (
        <AuthContext.Provider value={{ name }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;