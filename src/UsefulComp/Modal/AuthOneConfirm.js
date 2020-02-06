
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Input } from 'reactstrap';
import fire from '../../components/Firebase/firebase'
const AuthOneConfirm =(props)=> {
   
  const {
    email,
    handleUser
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () =>{
       setModal(!modal)

    };
   const toggle2=()=>{
    handleUser();
    setModal(!modal)

   } 
   window.onload=function(){
    setModal(!modal)
   }
   const handleChange=(e)=>{
    // console.log(e.target.value);
   }

  return (
    <div className="text-center">
       
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}><p className="text-danger">Please enter your temporary password inorder to register</p></ModalHeader>
        <ModalBody>
          <Input type="password" placeholder="Password" id="levelOneAuthPass" onChange={handleChange}></Input>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={toggle2}>Confirm</Button>{' '}
          <Button color="danger" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
  

}

export default AuthOneConfirm;