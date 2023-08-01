import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


const ChatContext = createContext();

export const ChatProvider = ({children})=> {
    const [user,setUser] = useState();

    const navigate = useNavigate();

    const userDataInLocalStorage = ()=>{
       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
       setUser(userInfo);

       if(!userInfo){
        navigate("/");
       }
    }

    useEffect(()=> userDataInLocalStorage(),[]);

  return <ChatContext.Provider value={{user, setUser}}>{children}</ChatContext.Provider>
}

export const ChatState = ()=>{
    return useContext(ChatContext);
}
