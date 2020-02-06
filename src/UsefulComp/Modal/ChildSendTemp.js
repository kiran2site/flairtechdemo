
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Input } from 'reactstrap';

const ChildSendTemp = (props) => {
  const {
    buttonLabel,
    className,
    handleBoard,
    handleEmail,
    sendMail
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () =>{
     
       setModal(!modal)

    };
   const toggle2=()=>{
    handleBoard()
    setModal(!modal)
   } 
   const toggle3=()=>{
     sendMail()
     setModal(!modal)
   }

  return (
    <div className="text-center">
      <Button color="success" id="modalLinkBtn"  className="w-75" onClick={toggle2}>Done</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}><p className="text-success">Your template has been saved!</p>Invite new user from the template saved now</ModalHeader>
        <ModalBody>
          <Input type="text" placeholder="Enter the Email" onChange={handleEmail}></Input>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle3}>Invite</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ChildSendTemp;