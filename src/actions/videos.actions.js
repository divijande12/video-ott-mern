import axios from "axios";
import { DOMAIN } from "../constants";
import { ADD_VIDEO, LOADING, GET_VIDEO } from "./types";

export const add_video = (data) => (dispatch) => {
  dispatch({ type: LOADING });
  console.log("data - add_video() - ", data);
  axios
    .post(`${DOMAIN}/api/videos/addVideo`, data)
    .then((res) => {
      console.log("add_video() - res - ", res);
      if (res.data.success) {
        dispatch({
          type: ADD_VIDEO,
          video: res.data.video,
          message: "",
        });
      } else {
        dispatch({
          type: ADD_VIDEO,
          video: null,
          message: res.data.message,
        });
      }
    })
    .catch((err) => {
      console.log("add_video() - err - ", err);
    });
};
export const get_video = (data) => (dispatch) => {
  dispatch({ type: LOADING });
  console.log("data - get_video() - ", data);
  axios
    .get(`${DOMAIN}/api/videos/getvideos`, data)
    .then((res) => {
      console.log("get_video - res -", res);
      if (res.data.success) {
        dispatch({
          type: GET_VIDEO,
          videos: res.data.result,
          message: "",
        });
      } else {
        dispatch({
          type: GET_VIDEO,
          videos: null,
          message: res.data.message,
        });
      }
    })
    .catch((err) => {
      console.log("add_video - ", err);
    });
};
