import { LOGIN_USER } from "../actions/types";

const initialState ={
    user_info: null
}

const loginReducer = (state = initialState, action) =>{
    const newState = {...state}
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user_info:action.payload.data.user_info
            }
        default:
            return newState;
            
    }
    // return newState;
}

export default loginReducer;