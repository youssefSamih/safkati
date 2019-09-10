
import { createStore, applyMiddleware } from 'redux';
//import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';

export default createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);
