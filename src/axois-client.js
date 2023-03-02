import axios from "axios";
import Cookies from 'js-cookie';
export const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
},


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
  (error) => {
      if (error.response.status === 401) {
          Cookies.remove('token');
          // Redirect the user to the login page
      }
      return Promise.reject(error);
  }
);

export default axiosClient;


// axiosClient.interceptors.request.use((config) => {
//   const token = Cookies.get("token");
//   config.headers['auth-token'] = `${token}`;
//   return config;
// },
// );

// // axiosClient.interceptors.response.use(
// //   (response) => {
// //     return response;
// //   },
// //   (error) => {
// //     const { response } = error;
// //     if (response.status === 401) {
// //       Cookies.remove("token");

// //     }
// //     throw error;
// //   }
// // );






// axiosClient.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     // if the error is 401 (Unauthorized) and we haven't already tried to refresh the token
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;


//       // Cookies.remove("token");

//       // refresh the token

//       debugger
//       return axiosClient.post('/refreshToken', {
//         headers: {
//           'auth-token': `${Cookies.get('token')}`
//         }
//       }).then(response => {
//         // update the token in the cookie
//         Cookies.set('token', response.data.token, { expires: 1 });

//         // update the Authorization header in the original request with the new token
//         console.log(response.data.token)
//         originalRequest.headers['auth-token'] = `${response.data.token}`;

//         // return the original request with the updated headers
//         debugger
//         return axiosClient(originalRequest);
//       })



//     }

//     // if the error is not 401 or if we've already tried to refresh the token, return the error
//     return Promise.reject(error);
//   }

// )








