import axios from 'axios';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const API_URL = 'http://localhost:3090';

export function signInUser({ email, password }, history) {
  return function(dispatch) {
    axios.post(`${API_URL}/signin`, { email, password })
      .then(res => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', res.data.token);
        history.push('/feature');
      })
      .catch(() => {
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signOutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function signUpUser({ email, password }, history) {
  return function(dispatch) {
    axios.post(`${API_URL}/signup`, { email, password })
      .then(res => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', res.data.token);
        history.push('/feature');
      })
      .catch(err => {
        dispatch(authError(err.response.data.error));
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(API_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(res => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: res.data.message
        });
      });
  }
}
