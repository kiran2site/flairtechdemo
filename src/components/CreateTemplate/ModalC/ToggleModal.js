import React, { useState } from "react";
import { Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Modal from 'react-responsive-modal'

import { FormGroup, Label, Input } from "reactstrap";
class ModalExample extends React.Component {
  
state={
  open:false
}

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
render(){
  const { buttonLabel, className , handleLabel,newLabelIdMention,handleChange} = this.props;
  const toggle2=()=>{
    this.setState({open:!this.state.open})
    handleLabel(newLabelIdMention);
  }
  return (
    <div>
      <Button color="danger" onClick={this.onOpenModal}>
        Create New Label
      </Button>
      <Modal  open={this.state.open} onClose={this.onCloseModal}>
          <h2>New label</h2>
          <FormGroup>
            <Label for="newLabel">Enter Name of the Label:</Label>
            <Input
              type="text"
              name="text"
              id="newLabel"
              placeholder=""
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="newLabelType">Select Type of the Label</Label>
            <Input type="select" name="select" id="newLabelType">
              <option>Text</option>
              <option>Email</option>
              <option>Number</option>
              <option>Date</option>
              <option>Reference Link</option>
            </Input>
          </FormGroup>
          <Button color="primary" id={newLabelIdMention} onClick={toggle2}>
            Create
          </Button>{" "}
          <Button color="secondary" onClick={this.onCloseModal}>
            Cancel
          </Button>
        </Modal>
    </div>
  );
  
}
};

export default ModalExample;
