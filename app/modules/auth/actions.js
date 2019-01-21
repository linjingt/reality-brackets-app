import { auth, database, provider } from '../../config/firebase';
import * as t from './actionTypes';

import { AsyncStorage } from 'react-native';

//register user with email and password
export function register(data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const { email, password, username } = data;
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          let user = { username, uid: res.user.uid };
          const userRef = database.ref().child('users');

          userRef
            .child(user.uid)
            .update({ ...user })
            .then(() => {
              dispatch({ type: t.LOGGED_IN, user });
              resolve(user);
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  };
}

//create user object in realtime db
export function createUser(user) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const userRef = database.ref().child('users');

      userRef
        .child(user.uid)
        .update({ ...user })
        .then(() => {
          dispatch({ type: t.LOGGED_IN, user });
          resolve(user);
        })
        .catch(err => reject(err));
    });
  };
}

//sign in user with email and password
export function login(data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const { email, password } = data;
      auth
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          //get user from realtime db
          let { user } = res;
          database
            .ref('users')
            .child(user.uid)
            .once('value')
            .then(snapshot => {
              const exists = snapshot.val() !== null;
              //if user exist in db, replace user variable with returned snapshot
              if (exists) user = snapshot.val();
              if (exists) dispatch({ type: t.LOGGED_IN, user });
              resolve({ exists, user });
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  };
}

//send password reset email
export function resetPassword(data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const { email } = data;
      auth
        .sendPasswordResetEmail(email)
        .then(() => resolve())
        .catch(err => reject(err));
    });
  };
}

//sign user out
export function signOut() {
  return dispatch => {
    return new Promise((resolve, reject) => {
      auth
        .signOut()
        .then(() => resolve())
        .catch(error => reject(error));
    });
  };
}

//sign user in using fb
//takes fb token after access granted and create credential object to pass to firebase to log in user
export function signInWithFb(fbToken) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const credential = provider.credential(fbToken);
      auth
        .signInAndRetrieveDataWithCredential(credential)
        .then(user => {
          //get user obj from realtime db
          database
            .ref('users')
            .child(user.uid)
            .once('value')
            .then(snapshot => {
              const exists = snapshot.val() !== null;
              //if user exist in db, replace user variable with returned snapshot
              if (exists) user = snapshot.val();
              if (exists) dispatch({ type: t.LOGGED_IN, user });
              resolve({ exists, user });
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  };
}

export function checkLoginStatus(callback) {
  return dispatch => {
    auth.onAuthStateChanged(user => {
      let isLoggedIn = user !== null;

      if (isLoggedIn) {
        database
          .ref('users')
          .child(user.uid)
          .once('value')
          .then(snapshot => {
            const exists = snapshot.val() !== null;
            //if user exist in db, replace user variable with returned snapshot
            if (exists) user = snapshot.val();
            if (exists) dispatch({ type: t.LOGGED_IN, user });
            callback(exists, isLoggedIn);
          })
          .catch(err => {
            //unable to get user
            dispatch({ type: t.LOGGED_OUT });
            callback(false, false);
          });
      } else {
        dispatch({ type: t.LOGGED_OUT });
        callback(false, isLoggedIn);
      }
    });
  };
}
