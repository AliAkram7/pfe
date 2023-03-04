import axios from "axios";
import Cookies from 'js-cookie';
export const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,},
  )
axiosClient.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
      config.headers['auth-token'] = `${token}`;
  }
  return config;
});
axiosClient.interceptors.response.use(
  (response) => response,
  (error)=>{
      if (error.response.status === 401) {
          Cookies.remove('token');
          // Redirect the user to the login page
      }
      return Promise.reject(error);
  }
);
export default axiosClient;
