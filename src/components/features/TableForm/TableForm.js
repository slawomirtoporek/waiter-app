import PropTypes from 'prop-types';
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

  const [billView, setBillView] = useState(false);

  const handleStatusChange = e => {
    const currentStatus = e.target.value;
    setStatus(currentStatus);
    if (currentStatus === 'Busy') {
      setBillView(true);
      setBill(0);
    } else if (currentStatus === 'Cleaning' || currentStatus === 'Free') {
      setBillView(false);
      setBill(0);
      setPeopleAmount(0);
    } else if (currentStatus === 'Reserved') {
      setBillView(false);
      setBill(0);
      setPeopleAmount(0);
    } else {
      setBillView(false);
    };
  };

  const handlePeopleAmount = e => {
    const numberOfQuests = parseInt(e.target.value) || '';
    if (!isNaN(numberOfQuests) && numberOfQuests >= 0 && numberOfQuests <= 10 && numberOfQuests <= maxPeopleAmount) {
      setPeopleAmount(numberOfQuests);
    };
  };

  const handleMaxPeopleAmount = e => {
    const maxNumberofQuests = parseInt(e.target.value) || '';
    if (!isNaN(maxNumberofQuests) && maxNumberofQuests >= 0 && maxNumberofQuests <= 10) {
      setMaxPeopleAmount(maxNumberofQuests);
      if (peopleAmount > maxNumberofQuests) {
        setMaxPeopleAmount(maxNumberofQuests);
      }
    };
  };

  const handleBill = e => {
    const totalBill = parseFloat(e.target.value) || '';
    if (!isNaN(totalBill) && totalBill >= 0) {
      setBill(totalBill);
    };
  };

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
            onChange={e => handleStatusChange(e)}
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
          onChange={(e) => handlePeopleAmount(e)}
          type="number" placeholder="Min" 
          className={styles.numPeople}
          />
          <Form.Text className="mx-2 fs-5">/</Form.Text>
          <Form.Control
            value={maxPeopleAmount}
            onChange={(e) => handleMaxPeopleAmount(e)}
            type="number" placeholder="Max" 
            className={styles.numPeople}
          />
        </Form.Group>
        <>
        {(billView || status === 'Busy') ? (
          <Form.Group className="d-flex mb-3">
            <Form.Label className={styles.label}>Bill:</Form.Label>
            <Form.Text className="mx-2 fs-5">$</Form.Text>
            <Form.Control
            value={bill}
            onChange={(e) => handleBill(e)}
            type="number" placeholder="Amount" 
            className={styles.bill}
            />
            </Form.Group>
          ) : ''}
        </>
        <Button type="submit">Update</Button>
      </Form>
  );
};

TableForm.propTypes = {
  id: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  props: PropTypes.object.isRequired,
};

export default TableForm