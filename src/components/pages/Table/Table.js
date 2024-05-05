import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTableById } from "../../../redux/tablesRedux";
import { editTableRequest } from "../../../redux/tablesRedux";
import TableForm from "../../features/TableForm/TableForm";

const Table = () => {

  const { id } = useParams();
  const table = useSelector(state => getTableById(state.tables, id));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmitTable = newTable => {
    dispatch(editTableRequest(newTable));
    navigate("/");
  };

  if (table) {
    return (
      <>
        <h1 className="fs-3">Table {id}</h1>
        <TableForm props={table} id={id} action={handleSubmitTable} />
      </>
    );
  } else {
    navigate("/");
    return null;
  }
};

export default Table;