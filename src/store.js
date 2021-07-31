import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import loginReducer from './reducers/loginreducer';
import thunkMiddleware  from 'redux-thunk';

const allReducers = combineReducers({
    user: loginReducer
})

const store = createStore(
    allReducers,
    compose(applyMiddleware(thunkMiddleware))
)

console.log(store.getState())
export default store;