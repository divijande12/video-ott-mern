import axios from "axios";
import { apis } from "../constants";
let data = null;
export const registerUser = async (
  firstname,
  lastname,
  username,
  email,
  password,
  roles
) => {
  await axios
    .post(`${apis.register}`, {
      firstname,
      lastname,
      username,
      email,
      password,
      roles,
    })
    .then((res) => {
      console.log(res);
      data = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
