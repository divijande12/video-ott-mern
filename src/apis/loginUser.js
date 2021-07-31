import axios from "axios";
import { apis } from "../constants";
let data = null;
export const loginUser = async (username, password, roles) => {
  await axios
    .post(`${apis.login}`, {
      username,
      password,
      roles,
    })
    .then((res) => {
      data = res;
      sessionStorage.setItem('user_data',res)
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
