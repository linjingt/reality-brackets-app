import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import reducers from './rootReducer'

const enhancer = compose(applyMiddleware(thunk))

//create redux store by importing root reducer and injecting store enhancers
export default createStore(reducers, enhancer)
