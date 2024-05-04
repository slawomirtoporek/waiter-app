import { useSelector } from "react-redux";
import { getAllTables } from "../../../redux/tablesRedux";
import { Button, Card, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
      <div className="d-flex justify-content-center">
        <Spinner className="mt-5" variant="secondary" />
      </div>
    );
  };

  return (
    <>
      <h1 className="fs-3">All tables</h1>
      <Col>
        {tables && tables.map(table => (
          <Card key={table.id} className="border-0 border-bottom">
              <Card.Body className="d-flex justify-content-between ps-0">
                <Card.Title>
                  <span className="fs-4 me-3">Table {table.id}</span> <span className="fs-6">Status: </span><span className="fs-6 fw-light">{table.status}</span>
                </Card.Title>
                <Button onClick={(e) => handleShowMore(e, table.id)}>Show more</Button>
              </Card.Body>
          </Card>
        ))}
      </Col>
    </>
  );
};

export default Home;