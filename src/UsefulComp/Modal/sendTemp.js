
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Input } from 'reactstrap';
import fire from '../../components/Firebase/firebase'
const SendTemp = (props) => {
  const {
    buttonLabel,
    className,
    handleBoard,
    handleChange,
    handleClick
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleMail = () => {
      setModal(!modal);
        handleClick()
    }

  return (
    <div className="text-center">
      <Button color="success" id="modalLinkBtn" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Enter the email id of the new user</ModalHeader>
        <ModalBody>
          <Input type="text" placeholder="Enter the Email" onChange={handleChange}></Input>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleMail}>Invite</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default SendTemp;