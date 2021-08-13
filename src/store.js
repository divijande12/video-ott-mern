import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import loginReducer from './reducers/loginreducer';
import thunkMiddleware  from 'redux-thunk';
import videoReducer from './reducers/videoReducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import commentReducer from './reducers/commentReducer';


const allReducers = combineReducers({
    user: loginReducer,
    videos: videoReducer,
    comment: commentReducer,
})

const store = createStore(
    allReducers,
    compose(composeWithDevTools(applyMiddleware(thunkMiddleware)))
)

console.log( 'divij ---',store.getState())
export default store;