import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import postReducer from './modules/post';
import authReducer from './modules/auth';

const reducers = combineReducers({
  post: postReducer,
  auth: authReducer
});
const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk)));

export default store;
