import axiosClient from "../../../../axois-client";


export const fetchDepartmentInfo=()=>{
    return axiosClient.get('teacher/department_manager/get_department_info') ; 
}

export const fetchStudentsData= ({queryKey}) => {
    const payload = queryKey[1] ;
    const year = queryKey[2]

    console.log(year)

    return axiosClient.get(`/teacher/department_manager/fetchStudentsData/${payload}/${year}`) ; 
}


export const adminfetchDepartmentsInfo=()=>{
    return axiosClient.get('/admin/getDepartmentsInfo') ; 
}



export const adminFetchYearScholar=()=>{
    return axiosClient.get('/admin/fetchYearsScholar') ; 
}
