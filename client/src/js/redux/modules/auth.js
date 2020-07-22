import axios from "axios";
import { AUTH_USER, REGISTER_USER } from '../../graphql/mutations';
export const SET_LOGIN = "app/user/login";
export const SET_LOGOUT = "app/user/logout";
export const SET_REGISTER = "app/user/register";
export const SET_ERROR = "app/user/error";

const initialState = {
  isAuthenticated: localStorage.getItem('authKey') ? true : false, //localStorage to stay logged in on reload 
  error: [],
  isRegistered: false
};

//reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN:
    case SET_LOGOUT:
      return {
        ...state,
        isAuthenticated: action.payload
      }
    case SET_REGISTER:
      return {
        ...state,
        isRegistered: action.payload,
        error: []
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

//action creator
export function getAuth({ email, password }) {
  return async function(dispatch) {
    let response = await axios({
      method: "POST",
      url: 'http://localhost:4000/graphql',
      data: {
        query: AUTH_USER,
        variables: {
          email: email,
          password: password
        }
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    let { data, error } = response;
    if(error) {
      dispatch(setError(error));
    } else {
      let isAuth = data.data.authenticate ? true : false;
      localStorage.setItem('authKey', data.data.authenticate);
      dispatch(setAuth(isAuth));
    }
  }
}

export function getRegister({ email, password }) {
  return async function(dispatch) {
    let response = await axios({
      method: "POST",
      url: 'http://localhost:4000/graphql',
      data: {
        query: REGISTER_USER,
        variables: {
          email: email,
          password: password
        }
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    let { data, error } = response;
    if(error) {
      dispatch(setError(error));
    } else {
      dispatch(setRegister(data.data.register));
    }
  }
}

export function removeAuth() {
  return async function(dispatch) {
    dispatch(setAuth(false))
  }
}

export function setAuth(isAuth) {
  return {
    type: !isAuth ? SET_LOGOUT : SET_LOGIN,
    payload: isAuth
  };
}

export function setRegister(isRegistered) {
  return {
    type: SET_REGISTER,
    payload: isRegistered
  };
}

export function setError(error) {
  return {
    type: SET_ERROR,
    payload: error
  };
}