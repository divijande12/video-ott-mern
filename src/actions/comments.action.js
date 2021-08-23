import axios from "axios";
import { LOADING, ADD_COMMENT, GET_COMMENT } from "./types";

export const add_comment = (data) => (dispatch) => {
  console.log("add_comment actions data", data);
  dispatch({ type: LOADING });
  axios
    .post("/api/comments/saveComment", data)
    .then((res) => {
      console.log("add_comment res - ", res.data);
      if (res.data.success) {
        dispatch({
          type: ADD_COMMENT,
          comment: res.data.message,
          message: "",
        });
      } else {
        dispatch({
          type: ADD_COMMENT,
          comment: null,
          message: res.data.message,
        });
      }
    })
    .catch((err) => {
      console.log("add_comment actions catch", err);
    });
};

export const get_comment = (data) => (dispatch) => {
  dispatch({ type: LOADING });
  axios
    .post("/api/comments/getComments", data)
    .then((res) => {
      if (res.data.success) {
        console.log("getcomment then - ", res.data);
        dispatch({
          type: GET_COMMENT,
          success: true,
          comment: [...res.data.message],
          message: "",
        });
        console.log("video = ", res.data);
      } else {
        dispatch({
          type: GET_COMMENT,
          success: false,
          comment: [],
          message: res.data.message,
        });
      }
    })
    .catch((err) => {
      console.log("getcomment - catch -", err);
    });
};
