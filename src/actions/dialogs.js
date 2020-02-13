import Axios from 'axios';
import store from '../store';
import Cookies from 'js-cookie';
import {
  SET_DIALOGS,
  CLEAR_DIALOGS,
  FETCH_DIALOGS,
  UPDATE_DIALOG,
  SET_DIALOG,
  SET_FETCH,
  UNSET_FETCH,
  ADD_ERROR
} from '../types';

import { API_ADDR } from '../common';

export const fetchUserDialogs = () => {
  const access_token = Cookies.get('access_token');
  const url = API_ADDR;
  store.dispatch({
    type: SET_FETCH,
    payload: FETCH_DIALOGS
  });
  return dispatch =>
    Axios.get(url, { headers: { 'access-token': access_token } })
      .then(res => {
        const dialogs = res.data.data;
        dispatch({
          type: SET_DIALOGS,
          payload: dialogs
        });
        dispatch({
          type: UNSET_FETCH,
          payload: FETCH_DIALOGS
        });
      })
      .catch(e => {
        debugger;
        const message = e.message;
        dispatch({
          type: ADD_ERROR,
          payload: message
        });
        dispatch({
          type: UNSET_FETCH,
          payload: FETCH_DIALOGS
        });
      });
};

export const updateDialog = ({ dialog }) => {
  const access_token = Cookies.get('access_token');
  const url = API_ADDR + '';
  store.dispatch({
    type: SET_FETCH,
    payload: UPDATE_DIALOG
  });
  return dispatch =>
    Axios.post(
      url,
      {
        ...dialog
      },
      { headers: { 'access-token': access_token } }
    )
      .then(res => {
        const dialog = res.data.data;
        dispatch({
          type: SET_DIALOG,
          payload: dialog
        });
        dispatch({
          type: UNSET_FETCH,
          payload: UPDATE_DIALOG
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
          payload: UPDATE_DIALOG
        });
      });
};
