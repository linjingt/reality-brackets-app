import * as t from './actionTypes';

let initialState = {
  isLoading: false,
  comments: [],
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.LOADING_COMMENTS: {
      const comments = state.comments;

      //show loading signal
      if (comments.length === 0) return { ...state, isLoading: true };

      return state;
    }

    case t.COMMENTS_AVAILABLE: {
      let { data } = action;
      let comments = [];

      //convert the snapshot (json object) to array
      data.forEach(function(childSnapshot) {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;

        comments.push(item);
      });

      comments.reverse();

      return { ...state, comments, isLoading: false };
    }

    case t.LOGGED_OUT: {
      return { ...state, comments: [] };
    }

    default:
      return state;
  }
};

export default homeReducer;
