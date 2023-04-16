import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie"
import jwt_decode from 'jwt-decode';
import { Navigate } from "react-router";

// import jwt_decode from 'jwt-decode';

const studentContext = createContext({
    student: null,
    setStudent: () => { },
    studentToken: null,
    setStudentToken: () => { },
    isInTeam: false,
    setIsInTeam: () => { },
    roomDiscription: null,
    roomName: null,
    roomId: null,
    setRoomDiscription: () => { },
    setRoomName: () => { },
    setRoomId: () => { },
    firstLogin: null,
    setFirstLogin: () => { },
    affMethod: null,
    setAffMethod: () => { },
    choiceStatus: null,
    // * true reference that time to choose still  "open"
    //  * false reference that students affect a supervisor or theme ,  or  there are no choice list  "close"
    setChoiceStatus: () => { },
    hasSupervisor: null,
    setHasSupervisor: () => { },

})

export const StudentContextProvider = ({ children }) => {
    const [student, setStudent] = useState({})
    const [studentToken, _setStudentToken] = useState(Cookies.get('token'))
    const [isInTeam, setIsInTeam] = useState(false)
    const [roomDiscription, setRoomDiscription] = useState(null)
    const [roomName, setRoomName] = useState(null)
    const [roomId, setRoomId] = useState(null)
    const [firstLogin, setFirstLogin] = useState(Cookies.get('token') ? jwt_decode(Cookies.get('token')).first_login : null)
    const [affMethod, setAffMethod] = useState(Cookies.get('token') ? jwt_decode(Cookies.get('token')).aff_method : null)
    const [choiceStatus, setChoiceStatus] = useState(true);
    const [hasSupervisor, setHasSupervisor] = useState(false);
    //!!  decode the special information from the token and check the token if is has role student  !! 


    const setStudentToken = (token) => {
        if (token) {
            const decodedToken = jwt_decode(token)
            if (decodedToken.role === 'student') {
                _setStudentToken(token)
                // setIsInTeam(decodedToken.isInTeam)   
                setFirstLogin(decodedToken.first_login)
            } else {
                Cookies.remove('token');
                return <Navigate to='/' />
            }
        }
    }
    return (<studentContext.Provider value={
        {
            student, setStudent, studentToken,
            setStudentToken,
            isInTeam, setIsInTeam,
            setRoomDiscription, setRoomName,
            setIsInTeam, setRoomId,
            roomDiscription, roomName,
            roomId, firstLogin, setFirstLogin,
            affMethod, setAffMethod,
            choiceStatus, setChoiceStatus, 
            hasSupervisor, setHasSupervisor

        }
    }> {children} </studentContext.Provider>)
}

export const useStudentContext = () => useContext(studentContext)
