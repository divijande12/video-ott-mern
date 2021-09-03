import axios from "axios";
import { DOMAIN } from "../constants";
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
    .post(`${DOMAIN}/api/auth/signup`, {
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
