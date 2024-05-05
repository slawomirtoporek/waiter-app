import { useSelector } from "react-redux";
import { getAllStatus } from "../../../redux/statusRedux";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./TableForm.module.scss";

const TableForm = ({ id, action, props }) => {

  const statusSelect = useSelector(getAllStatus);
 
  const [status, setStatus] = useState(props.status || '');
  const [peopleAmount, setPeopleAmount] = useState(props.peopleAmount || '');
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(props.maxPeopleAmount || '');
  const [bill, setBill] = useState(props.bill || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    action({id, status, peopleAmount, maxPeopleAmount, bill});
  };

  return (
    <Form onSubmit={handleSubmit} className="my-4">
        <Form.Group className="d-flex mb-3">
          <Form.Label className={styles.label}>Status:</Form.Label>
          <Form.Select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className={styles.status}
            >
            {statusSelect.map(status => (
              <option key={status.id} value={status.name}>{status.name}</option>
            ))};
          </Form.Select>
        </Form.Group>
        <Form.Group className="d-flex mb-3">
          <Form.Label className={styles.label}>People:</Form.Label>
          <Form.Control
          value={peopleAmount}
          onChange={(e) => setPeopleAmount(e.target.value)}
          type="number" placeholder="Min" 
          className={styles.numPeople}
          />
          <Form.Text className="mx-2 fs-5">/</Form.Text>
          <Form.Control
            value={maxPeopleAmount}
            onChange={(e) => setMaxPeopleAmount(e.target.value)}
            type="number" placeholder="Max" 
            className={styles.numPeople}
          />
        </Form.Group>
        <Form.Group className="d-flex mb-3">
          <Form.Label className={styles.label}>Bill:</Form.Label>
          <Form.Text className="mx-2 fs-5">$</Form.Text>
          <Form.Control
          value={bill}
          onChange={(e) => setBill(e.target.value)}
          type="number" placeholder="Amount" 
          className={styles.bill}
          />
        </Form.Group>
        <Button type="submit">Update</Button>
      </Form>
  );
};

export default TableForm