import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie"
import jwt_decode from 'jwt-decode';
import { Navigate } from "react-router";

// import jwt_decode from 'jwt-decode';

const teacherContext = createContext({
    teacher: null,
    setTeacher: () => { },
    teacherToken: null,
    setTeacherToken: () => { },
    isInTeam: false,
    setIsInTeam: () => { },
    roomDiscription: null,
    roomName: null,
    roomId: null,
    setRoomDiscription: () => { },
    setRoomName: () => { },
    setRoomId: () => { },
    teamSelected: null,
    setTeamSelected: () => { },
    isDepartmentManager: null,
    setIsDepartmenManager: () => { },
    selectedSpeciality: null,
    setSelectedSpeciality: () => { },
    selectedSpeciality_id: null,
    setSelectedSpeciality_id:()=>{} 

})

export const TeacherContextProvider = ({ children }) => {
    const [teacher, setTeacher] = useState({})
    const [teacherToken, _setTeacherToken] = useState(null)
    const [isInTeam, setIsInTeam] = useState(Cookies.get('token') ? jwt_decode(Cookies.get('token')).isInTeam : false)
    const [roomDiscription, setRoomDiscription] = useState(null)
    const [roomName, setRoomName] = useState(null)
    const [roomId, setRoomId] = useState(null)
    const [isDepartmentManager, setIsDepartmentManager] = useState()
    const [teamSelected, setTeamSelected] = useState();
    const [selectedSpeciality, setSelectedSpeciality] = useState()
    const [selectedSpeciality_id, setSelectedSpeciality_id] = useState()

    // !! decode the special information from the token and check the token if is hase role teacher !! 

    const setTeacherToken = (token) => {
        if (token) {
            const decodedToken = jwt_decode(token)
            console.log(decodedToken)

            if (decodedToken.role === 'teacher') {
                _setTeacherToken(token)
            } else {
                Cookies.remove('token');
                return <Navigate to='/' />
            }
            if (decodedToken.department_manager) {
                setIsDepartmentManager(true);
            }


        }
    }
    return (<teacherContext.Provider value={
        {
            teacher, setTeacher, teacherToken, setTeacherToken, setIsInTeam, setRoomDiscription, setRoomName, setIsInTeam, setRoomId, roomDiscription, roomName, roomId,
            teamSelected, setTeamSelected, isDepartmentManager, setIsDepartmentManager, setSelectedSpeciality, selectedSpeciality, selectedSpeciality_id, setSelectedSpeciality_id
        }
    }> {children} </teacherContext.Provider>)
}

export const useTeacherContext = () => useContext(teacherContext)
