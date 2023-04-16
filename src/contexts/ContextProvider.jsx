import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie"
import jwt_decode from 'jwt-decode';
import { Navigate } from "react-router";


// import jwt_decode from 'jwt-decode';



const StateContext = createContext({
    user: null,
    setUser: () => { },
    token: null,
    role: null,
    setToken: () => { },
    setRole: () => { },
    setRoomDiscription: () => { },
    roomDiscription: null,
    setRoomName: () => { },
    roomName: null,
    setRoomId: () => { },
    roomId: null,

})



export const ContextProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [token, _setToken] = useState(Cookies.get('token'))
    const [role, setRole] = useState(Cookies.get('token') ? jwt_decode(Cookies.get('token')).role : null)
    const [roomDiscription, setRoomDiscription] = useState()
    const [roomName, setRoomName] = useState()
    const [roomId, setRoomId] = useState()


    const setToken = (token) => {
        if (token) {
            _setToken(token)
            Cookies.set('token', token, { expires: 7 })
            const decodedToken = jwt_decode(token);

            setRole(decodedToken.role);
            if(decodedToken.role!='student' && decodedToken.role!='teacher' && decodedToken.role!='admin' ){
                <Navigate  to='/' />
            }
        } else {
            Cookies.remove('token')
        }
    }






    return (<StateContext.Provider value={
        {
            user, setToken, token,
            role, setRole, setUser,
            setRoomDiscription, setRoomName, setRoomId,
            roomId, roomDiscription, roomName, 
        }
    }> {children} </StateContext.Provider>)
}

export const useStateContext = () => useContext(StateContext)
