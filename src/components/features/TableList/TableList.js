import { Card, Button } from "react-bootstrap";

const TableList = ({tableList, action}) => {

  return (
    <>
      {tableList && tableList.map(table => (
        <Card key={table.id} className="border-0 border-bottom">
            <Card.Body className="d-flex justify-content-between ps-0">
              <Card.Title>
                <span className="fs-4 me-3">Table {table.id}</span> 
                <span className="fs-6">Status: </span>
                <span className="fs-6 fw-light">{table.status}</span>
              </Card.Title>
              <Button onClick={(e) => action(e, table.id)}>Show more</Button>
            </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default TableList;