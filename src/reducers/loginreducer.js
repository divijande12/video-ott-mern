import { LOGIN_USER, GOOGLE_LOGIN, FACEBOOK_LOGIN } from "../actions/types";

const initialState = {
  user_info: JSON.parse(sessionStorage.getItem("user_data")) || null,
};

const loginReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOGIN_USER:
      newState.user_info = action.payload;
      break;
    case GOOGLE_LOGIN:
      newState.user_info = action.payload;
      break;
    case FACEBOOK_LOGIN:
      newState.user_info = action.payload;
      break;
    default:
      return newState;
  }
  return newState;
};

export default loginReducer;
