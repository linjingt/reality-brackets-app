import * as t from './actionTypes';
import * as api from './api-firebase';

//call api function and dispatching right action based on response returned
export function addComment(comment, successCB, errorCB) {
  return dispatch => {
    api.addComment(comment, function(success, data, error) {
      if (success) successCB();
      else if (error) errorCB(error);
    });
  };
}


export function getComments(errorCB) {
  return dispatch => {
    dispatch({ type: t.LOADING_COMMENTS });
    api.getComments(function(success, data, error) {
      if (success) dispatch({ type: t.COMMENTS_AVAILABLE, data });
      else if (error) errorCB(error);
    });
  };
}


export function updateComment(comment, successCB, errorCB) {
  return dispatch => {
    api.updateComment(comment, function(success, data, error) {
      if (success) successCB();
      else if (error) errorCB(error);
    });
  };
}


export function deleteComment(comment, errorCB) {
  return dispatch => {
    api.deleteComment(comment, function(success, data, error) {
      if (error) errorCB(error);
    });
  };
}


export function toggleLove(data, errorCB) {
  return dispatch => {
    dispatch({ type: t.LOADING_COMMENTS });
    api.toggleLove(data, function(success, data, error) {
      if (error) errorCB(error);
    });
  };
}
