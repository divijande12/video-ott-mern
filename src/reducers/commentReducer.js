import { ADD_COMMENT, GET_COMMENT, LOADING } from '../actions/types';

const initialState = {
    comments: [],
    loading: false,
}

const commentReducer = (state = initialState, action) =>{
    switch(action.type){
        case LOADING:
            return{ ...state, 
                    loading:true
                };
        case ADD_COMMENT:
            return{...state, 
                    comments:[...state.comments, 
                    action.comment],
                    loading:false
                };
        case GET_COMMENT:
            return{ 
                    comments: [...action.comment],
                    loading:false
                };
        default:
            return state;
    }
}

export default commentReducer;