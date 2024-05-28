import axios from "axios";
import { endPoints } from "../config/endPoints";
interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}
export const fetchUsers = async () => {
  let result = await axios.get(endPoints.GET_USERS);
  return result.data;
};

export const signUp = async (data: User) => {
  let result = await axios.post(endPoints.ADD_USER, data);
  return result.data;
};

export const signIn = async (data: User) => {
  let result = await axios.post(endPoints.LOGIN, data);
  return result.data;
};
