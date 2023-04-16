import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie"
import jwt_decode from 'jwt-decode';
import { Navigate } from "react-router";

// import jwt_decode from 'jwt-decode';

const adminContext = createContext({

    adminToken: null,
    setAdminToken: () => { },
    selectedSpeciality: null,
    setSelectedSpeciality: () => { },
    selectedSpeciality_id: null,
    setSelectedSpeciality_id: () => { },

})


export const AdminContextProvider = ({ children }) => {

    const [adminToken, _setAdminToken] = useState(null)
    const [selectedSpeciality, setSelectedSpeciality] = useState()
    const [selectedSpeciality_id, setSelectedSpeciality_id] = useState()

    // !! decode the special information from the token and check the token if is hase role teacher !! 

    const setAdminToken = (token) => {
        if (token) {
            const decodedToken = jwt_decode(token)
            if (decodedToken.role === 'admin') {
                _setAdminToken(token)
                jwt_decode(token)
            } else {
                Cookies.remove('token');
                return <Navigate to='/' />
            }

        }
    }
    return (<adminContext.Provider value={
        {
            adminToken, setAdminToken,
            setSelectedSpeciality, selectedSpeciality,
             selectedSpeciality_id, setSelectedSpeciality_id,

        }
    }> {children} </adminContext.Provider>)
}

export const useAdminContext = () => useContext(adminContext)
