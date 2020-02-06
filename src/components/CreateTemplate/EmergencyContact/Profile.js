import React,{useState} from 'react'
import CustomProfile from './CustomProfile'
import {
  FormGroup,
  Form,
  Input,
  Label,
  Button,
  Collapse,
  Row,
  Col
} from "reactstrap";
function Profile(){
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const handleChange=()=>{

  }
  return (
    <div>
      <Button color="secondary" onClick={toggle} className="w-100 m-1">
        Emergency Contact
      </Button>
      <Collapse isOpen={isOpen} className="m-1">
      <div id="emergencyform">
          <Row>
            <Col>
              {/* <CustomProfile
                label="Name"
                id="e_name"
                placeholder=""
                name="EMC_name"
                handleChange={handleChange}
              /> */}
              <FormGroup id="e_name">
    <Label htmlFor="EMCe_name">Name<span className="req-field">*</span>:</Label>
    <Input
      type="text"
      placeholder=""
      id="EMCe_name"
      name="EMC_name"
      onChange={handleChange}
      required
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
  </FormGroup>
            </Col>
            <Col>
              {/* <CustomProfile
                label="Phone"
                id="e_phone"
                placeholder=""
                name="EMC_phone"
                handleChange={handleChange}
              /> */}
              <FormGroup id="e_phone">
    <Label htmlFor="EMCe_phone">Phone<span className="req-field">*</span>:</Label>
    <Input
      type="text"
      placeholder=""
      id="EMCe_phone"
      name="EMC_phone"
      onChange={handleChange}
      required
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
  </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <CustomProfile
                label="Mail Id"
                id="e_mail"
                placeholder=""
                name="EMC_mail"
                handleChange={handleChange}
              /> */}
              <FormGroup id="e_mail">
    <Label htmlFor="EMCe_mail">Mail Id:</Label>
    <Input
      type="text"
      placeholder=""
      id="EMCe_mail"
      name="EMC_mail"
      onChange={handleChange}
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
  </FormGroup>
            </Col>
            <Col>
             
            </Col>
          </Row>
          <div id="contactAppendBlock">

          </div>
      </div>
      </Collapse>
    </div>
  );
 
}

export default Profile