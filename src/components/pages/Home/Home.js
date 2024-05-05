import { useSelector } from "react-redux";
import { getAllTables } from "../../../redux/tablesRedux";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ListTables from "../../features/TableList/TableList";

const Home = () => {

  const tables = useSelector(getAllTables);
  const loading = useSelector(state => state.tables.loading);

  const navigate = useNavigate();

  const handleShowMore = (e, tableId) => {
    e.preventDefault();
    navigate(`/table/${tableId}`);
  };

  if (loading) {
    return (
      <>
        <h1 className="fs-3">All tables</h1>
        <div className="d-flex justify-content-center">
          <Spinner className="mt-5" variant="secondary" />
        </div>
      </>
    );
  };

  return (
    <>
      <h1 className="fs-3">All tables</h1>
      <ListTables tableList={tables} action={handleShowMore} />
    </>
  );
};

export default Home;