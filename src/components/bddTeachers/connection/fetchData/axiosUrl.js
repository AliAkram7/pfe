import axiosClient from "../../../../axois-client";


export const fetchDepartmentInfo=()=>{
    return axiosClient.get('teacher/department_manager/get_department_info') ; 
}

export const fetchStudentsData= ({queryKey}) => {
    const payload = queryKey[1] ;
    return axiosClient.get(`/teacher/department_manager/fetchStudentsData/${payload}`) ; 
}

export const fetchTeachersData =()=>{
    return axiosClient.get('/admin/fetchTeachers') ; 
}

export const fetchGradesData =()=>{
    return axiosClient.get('/admin/fetchGrades') ; 
}

export const fetchResearchFocus =()=>{
    return axiosClient.get('/admin/fetchResearchFocus') ; 
}

export const fetchRolesData =()=>{
    return axiosClient.get('/admin/fetchRoles') ; 
}

export const adminfetchDepartmentsInfo=()=>{
    return axiosClient.get('/admin/getDepartmentsInfo') ; 
}