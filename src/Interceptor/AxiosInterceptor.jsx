import { store } from "./../redux/Store"; // Import your Redux store and action
import { updatetoken } from "./../redux/AuthContext"; // Import your logout action from
import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
const CancelToken = axios.CancelToken;

const source = CancelToken.source();

const PrivateAxios = axios.create({
  baseURL: 'https://www.zenith-care.online/',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

PrivateAxios.interceptors.request.use(async (req) => {
  console.log("Request:", req);
  const accessToken = store.getState().auth.accessToken;
  console.log(accessToken)
  const user = jwt_decode(accessToken); // Use jwt_decode.default to access the function
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
  if (isExpired) {
    console.log("false");
  } else {
    console.log("true");
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (!isExpired) return req;
  console.log(store.getState().auth.refreshToken);


  try {
    const response = await axios.post(
      "https://www.zenith-care.online/token/refresh/", // Replace with the correct URL
      {
        refresh: store.getState().auth.refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        cancelToken: source.token,
      }
    );

    const accessTokens = response.data.access;
    const refreshTokens = response.data.refresh;
    store.dispatch(
      updatetoken({
        accessToken: accessTokens,
        refreshToken: refreshTokens,
      })
    );
    req.headers.Authorization = `Bearer ${response.data.access}`;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    } else {
      console.error("Error refreshing the token:", error);
    }
  }
  return req;
});

export default PrivateAxios;
