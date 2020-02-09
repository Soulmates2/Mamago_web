import Axios from 'axios';
import { SET_USER, ADD_ERROR, SET_FETCH, UNSET_FETCH, FETCH_USER } from '../types';
import store from '../store';

export const fetchUser = () => {
  const access_token = Cookies.get('access_token');
  const url = API_ADDR + '';
  store.dispatch({
    type: SET_FETCH,
    payload: FETCH_USER
  });
  return dispatch =>
    Axios.get(url, { headers: { 'access-token': access_token } })
      .then(res => {
        const user = res.data.data;
        dispatch({
          type: SET_USER,
          payload: user
        });
        dispatch({
          type: UNSET_FETCH,
          payload: FETCH_USER
        });
      })
      .catch(e => {
        const message = e.message;
        dispatch({
          type: ADD_ERROR,
          payload: message
        });
        dispatch({
          type: UNSET_FETCH,
          payload: FETCH_USER
        });
      });
};
