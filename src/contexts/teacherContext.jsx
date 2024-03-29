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
    isSpecialtyManager: null,
    setIsSpecialtyManager: () => { },

    selectedSpeciality: null,
    setSelectedSpeciality: () => { },
    selectedSpeciality_id: null,
    setSelectedSpeciality_id: () => { },

    affectationMethod: null,
    setAffectationMethod: () => { },

    firstLogin: null,
    setFirstLogin: () => { },


    selectedYearId: null,
    setSelectedYearId: () => { },
    selectedYearString: '',
    setSelectedYearString: () => { },


})

export const TeacherContextProvider = ({ children }) => {
    const [teacher, setTeacher] = useState({})
    const [teacherToken, _setTeacherToken] = useState(null)
    const [isInTeam, setIsInTeam] = useState(false)
    const [roomDiscription, setRoomDiscription] = useState(null)
    const [roomName, setRoomName] = useState(null)
    const [roomId, setRoomId] = useState(null)
    const [isDepartmentManager, setIsDepartmentManager] = useState(Cookies.get('token') ? jwt_decode(Cookies.get('token')).department_manager : 0)
    const [teamSelected, setTeamSelected] = useState(null);
    const [selectedSpeciality, setSelectedSpeciality] = useState()
    const [selectedSpeciality_id, setSelectedSpeciality_id] = useState()
    const [isSpecialtyManager, setIsSpecialtyManager] = useState(Cookies.get('token') ? jwt_decode(Cookies.get('token')).specialty_manager : 0)
    const [affectationMethod, setAffectationMethod] = useState(Cookies.get('token') ? jwt_decode(Cookies.get('token')).pfe_method : 0)
    const [firstLogin, setFirstLogin] = useState(Cookies.get('token') ? jwt_decode(Cookies.get('token')).first_login : null)

    // !! decode the special information from the token and check the token if is has role teacher !! 

    const [selectedYearId, setSelectedYearId] = useState(Cookies.get('token') ? jwt_decode(Cookies.get('token')).year_scholar_id : 1)
    const [selectedYearString, setSelectedYearString] = useState()


    const setTeacherToken = (token) => {
        if (token) {
            const decodedToken = jwt_decode(token)

            if (decodedToken.role === 'teacher') {
                _setTeacherToken(token)
                jwt_decode(token)
                console.log(decodedToken)

            } else {
                Cookies.remove('token');
                return <Navigate to='/' />
            }
            if (decodedToken.department_manager == 1) {
                setIsDepartmentManager(true);
            }
            if (decodedToken.specialty_manager) {
                setIsSpecialtyManager(true)
            }


        }
    }
    return (<teacherContext.Provider value={
        {
            teacher, setTeacher, teacherToken, setTeacherToken, setRoomDiscription, setRoomName, setRoomId, roomDiscription, roomName, roomId, setIsInTeam, isInTeam,
            teamSelected, setTeamSelected, isDepartmentManager, setIsDepartmentManager, setSelectedSpeciality, selectedSpeciality, selectedSpeciality_id, setSelectedSpeciality_id,
            isSpecialtyManager, setIsSpecialtyManager,
            affectationMethod, setAffectationMethod,
            firstLogin, setFirstLogin,
            selectedYearId, setSelectedYearId,
            selectedYearString, setSelectedYearString,
        }
    }> {children} </teacherContext.Provider>)
}

export const useTeacherContext = () => useContext(teacherContext)
