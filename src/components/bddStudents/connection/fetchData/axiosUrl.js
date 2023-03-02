import axiosClient from "../../../../axois-client";


export const fetchDepartmentInfo=()=>{
    return axiosClient.get('teacher/department_manager/get_department_info') ; 
}


export const fetchStudentsData= ({queryKey}) => {
    const payload = queryKey[1] ;
    return axiosClient.get(`/teacher/department_manager/fetchStudentsData/${payload}`) ; 
}