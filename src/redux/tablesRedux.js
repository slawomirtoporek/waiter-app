import initialState from "./initialState";

// selectors
export const getAllTables = (state) => state.tables.tables;

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const LOADING_DATA = createActionName('LOADING_DATA');

// action creators
const updateTables = payload => ({ type: UPDATE_TABLES, payload });
const loadingData = () => ({ type: LOADING_DATA });

export const fetchTables = () => {
  return (dispatch) => {
    dispatch(loadingData());
    fetch('http://localhost:3131/api/tables')
    .then(res => {
      if (res.status === 200) {
        return res.json()
        .then(tables => dispatch(updateTables(tables)));
      } else {
        return <p>Error: Incorrect data!</p>
      };
    });
  };
};

const tablesReducer = (statepart = initialState, action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return { ...statepart, tables: action.payload, loading: false };
    case LOADING_DATA:
      return { ...statepart, loading: true };
    default:
      return statepart;
  };
};

export default tablesReducer;