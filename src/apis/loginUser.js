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
      console.log('login res -',res)
      data = res;
      sessionStorage.setItem('user_data',res)
      sessionStorage.setItem('user_data',JSON.stringify(res.data))
      sessionStorage.setItem('username', res.data.username)
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
