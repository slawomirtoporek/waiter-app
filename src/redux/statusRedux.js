// selectors
export const getAllStatus = ({status}) => status;

// actions
const createActionName = actionName => `app/status/${actionName}`;
const TABLE_STATUS = createActionName('TABLE_STATUS');

// action creators
const tableStatus = payload => ({ type: TABLE_STATUS, payload });

export const fetchStatus = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/api/status')
    .then(res => res.json())
    .then(status => dispatch(tableStatus(status)))
  };
};

const statusReducer = (statepart = [], action) => {
  switch (action.type) {
    case TABLE_STATUS:
      return [ ...action.payload ];
    default:
      return statepart;
  };
};

export default statusReducer;