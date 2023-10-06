import axiosInstance from "../axiosInstance";
import { store } from "./../redux/Store"; // Import your Redux store and action
import { updatetoken} from "./../redux/AuthContext"; // Import your logout action from 
import axios from "axios";

// ... (previous imports)

let isRefreshing = false;
let failedQueue = [];

axiosInstance.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const originalConfig = error.config;
    console.log(originalConfig);

    console.log("Access token soviet union");

    if (error.response && error.response.status === 401 && !isRefreshing) {
      isRefreshing = true;
      const refresh_token = store.getState().auth.refreshToken;
console.log(refresh_token)
      try {
        const response = await axiosInstance.post(
          "token/refresh/",
          {
            refresh: refresh_token,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data["access"]}`;
          const accessTokens = response.data.access;
          const refreshTokens = response.data.refresh;
          store.dispatch(updatetoken({
            accessToken: accessTokens,
            refreshToken: refreshTokens
          }));
          console.log("accessToken");
          return axiosInstance(error.config);
        }
      } catch (refreshError) {
        console.log('Failed to refresh token:', refreshError);
      } finally {
        console.log('Failed to refresh token hdsgfhdghgfhs');
        isRefreshing = false;
      }
    }

    // If the token refresh is in progress, queue the failed request
    if (error.response && error.response.status === 401) {
      const retryOriginalRequest = new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject, config: originalConfig });
      });
      return retryOriginalRequest;
    }

    return Promise.reject(error);
  }
);

// export default axiosInstance;




// let refresh = false;

// axiosInstance.interceptors.response.use(
//   (resp) => resp,
//   async (error) => {
//     if (error.response && error.response.status === 401 && !refresh) {
//       refresh = true;
//       const refresh_token = store.getState().auth.refreshToken;

//       console.log("its here23243",error.response.status);
//       try {
//         const response = await axiosInstance.post(
//           "token/refresh/",
//           {
//             refresh: refresh_token,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//             withCredentials: true,
//           }
//         );

//         if (response.status === 200) {
//           axiosInstance.defaults.headers.common[
//             "Authorization"
//           ] = `Bearer ${response.data["access"]}`;
//           const accessTokens = response.data.access;
//           const refreshTokens = response.data.refresh;
//           store.dispatch(updatetoken({
//             accessToken: accessTokens,
//             refreshToken: refreshTokens
//           }));
//           console.log("accessToken");
//           return axiosInstance(error.config);
//         }
//       } catch (refreshError) {
//         console.log("its here" + refreshError);
//       } finally {
//         refresh = false;
//       }
//     }
//     return Promise.reject(error);
//   }
// );




// import axios from 'axios';
// import { store } from "./../Redux/store"; // Import your Redux store and action
// import { logout,login } from "./../Redux/authSlice"; // Import your logout action from Redux


// let isRefreshing = false;
// let refreshQueue = [];


// const AxiosInstance = (accessToken) => {
//   const axiosInstance = axios.create({
//     baseURL: 'http://127.0.0.1:8000/api', // Replace with your base URL
//     timeout: 5000,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${accessToken}`,
//     },
//     withCredentials: true,
//   });

//   console.log("before")



//   axiosInstance.interceptors.response.use(
//     async (response) => {
//       console.log("interceptor no error::",response)
//       return response;
//     },
//     async (error) => {
//       if (error.response && error.response.status === 401) {
//         const originalConfig = error.config;

//         console.log("intercepter error 401 inside")
//         console.log(originalConfig)

//         if (!isRefreshing) {
//           isRefreshing = true;
//           const refresh_token = store.getState().auth.refreshToken;

//           try {
//             const response = await axios.post(
//               'http://127.0.0.1:8000/api/token/refresh/',
//               {
//                 refresh: refresh_token,
//               },
//               {
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//                 withCredentials: true,
//               }
//             );

//             if (response.status === 200) {
//               const newAccessToken = response.data['access'];
//               const newRefreshToken = response.data['refresh'];
//               const is_super = store.getState().auth.is_super;
//               const is_driver = store.getState().auth.is_driver;
//               const is_active = store.getState().auth.is_active;
//               const first_name = store.getState().auth.first_name;
//               const email = store.getState().auth.email;
//               const username = store.getState().auth.username;
//               const userId = store.getState().auth.userId;
//               const name = store.getState().auth.name;

//           console.log("New access token",newAccessToken);
//           console.log("new refresh token",newRefreshToken);


//             store.dispatch(
//               login({
//                 accessToken: newAccessToken,
//                 refreshToken: newRefreshToken,
//                 is_super:is_super,
//                 is_driver: is_driver,
//                 is_active : is_active,
//                 first_name : first_name,
//                 email : email,
//                 username : username,
//                 userId  : userId ,
//                 name : name,
//                 isAuthenticated : true
//               })
//             );

//               axios.defaults.headers.common[
//                 'Authorization'
//               ] = `Bearer ${newAccessToken}`;
//               originalConfig.headers[
//                 'Authorization'
//               ] = `Bearer ${newAccessToken}`;
//               return axios(originalConfig);
//             }
//           } catch (refreshError) {
            
//             console.log('Failed to refresh token:', refreshError);
//             store.dispatch(logout());
//           } finally {
//             isRefreshing = false;
//           }
//         } else {
//           // If a refresh token request is already in progress, enqueue the original request
//           return new Promise((resolve) => {
//             refreshQueue.push(() => {
//               originalConfig.headers['Authorization'] = `Bearer ${store.getState().auth.accessToken}`;
//               resolve(axios(originalConfig));
//             });
//           });
//         }
//       }
//       return Promise.reject(error);
//     }
//   );

//   return axiosInstance;
// };

// export default AxiosInstance;


