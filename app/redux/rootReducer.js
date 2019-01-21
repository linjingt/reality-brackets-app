//reducers in charge of updating state of the app
import { combineReducers } from 'redux';

import { reducer as authReducer } from '../modules/auth';
import { reducer as homeReducer } from '../modules/home';

//combined into single state object to create redux store
const rootReducer = combineReducers({ authReducer, homeReducer });

export default rootReducer;
