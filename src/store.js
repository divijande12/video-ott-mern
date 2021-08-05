import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import loginReducer from './reducers/loginreducer';
import thunkMiddleware  from 'redux-thunk';
import videoReducer from './reducers/videoReducer'
const allReducers = combineReducers({
    user: loginReducer,
    videos: videoReducer,
})

const store = createStore(
    allReducers,
    compose(applyMiddleware(thunkMiddleware))
)

console.log(store.getState())
export default store;