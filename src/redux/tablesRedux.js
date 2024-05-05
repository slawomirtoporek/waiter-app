import initialState from "./initialState";

// selectors
export const getAllTables = ({tables}) => tables.tables;
export const getTableById = ({tables}, tableId) => {
  if (tables) {
    return tables.find(table => table.id === tableId);
  } else {
    return null;
  }
};

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const LOADING_DATA = createActionName('LOADING_DATA');
const EDIT_TABLE = createActionName('EDIT_TABLE');

// action creators
const updateTables = payload => ({ type: UPDATE_TABLES, payload });
const loadingData = () => ({ type: LOADING_DATA });
const editTable = payload => ({ type: EDIT_TABLE, payload })
 
export const fetchTables = () => {
  return (dispatch) => {
    dispatch(loadingData());
    fetch('http://localhost:3131/api/tables')
    .then(res => res.json())
    .then(tables => dispatch(updateTables(tables)));
  };
};

export const editTableRequest = (newTable) => {
  const id = newTable.id;
  return (dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTable)
    };

    fetch(`http://localhost:3131/api/tables/${id}`, options)
      .then(() => {
        dispatch(editTable(newTable));
      });
  };
};

const tablesReducer = (statePart = initialState, action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return { ...statePart, tables: action.payload, loading: false };
    case EDIT_TABLE:
      return { ...statePart, tables: statePart.tables.map(table => (table.id === action.payload.id ? { ...table, ...action.payload } : table)) };
    case LOADING_DATA:
      return { ...statePart, loading: true };
    default:
      return statePart;
  };
};

export default tablesReducer;