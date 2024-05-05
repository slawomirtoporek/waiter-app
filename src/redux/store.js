import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import initialState from './initialState';
import tablesReducer from './tablesRedux';
import { default as thunk } from 'redux-thunk';
import statusReducer from './statusRedux';

const subreducers = {
  tables: tablesReducer,
  status: statusReducer,
};

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  ),
);

export default store;