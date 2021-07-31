import { LOGIN_USER } from './types';

export const setUserData = (dispatch, data) =>{
    dispatch({
        type: LOGIN_USER,
        payload: data,
    });
}
