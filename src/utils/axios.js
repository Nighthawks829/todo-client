import axios from "axios";
import { getTokenFromCookies } from "./cookies";
import { clearAuthStore } from "../stores/auth/authSlice";

const customFetch = axios.create({
  baseURL: "https://todobackend.nighthawks0230.com/api/v1",
  // baseURL: "http://192.168.0.110:3001/api/v1",
  withCredentials: true,
});

customFetch.interceptors.request.use((config) => {
  const token = getTokenFromCookies();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearAuthStore());
    return thunkAPI.rejectWithValue("Unauthozied! Logging out...");
  }
  const errorMessage = error.response?.data?.msg || "An error occured";
  return thunkAPI.rejectWithValue(errorMessage);
};

export default customFetch;
