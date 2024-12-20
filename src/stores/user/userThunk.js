import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearUserValues } from "./userSlice";

export const getUserThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);
    return response.data.user;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, user);
    thunkAPI.dispatch(clearUserValues());
    return response.data.user;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteUserThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.delete(url);
    thunkAPI.dispatch(clearUserValues());
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
