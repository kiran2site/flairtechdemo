import React, { useState } from "react";
import CustomProfile from "./CustomProfile";
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
function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const handleChange=()=>{

  }
  return (
    <div>
      <Button color="secondary" onClick={toggle} className="w-100 m-1">
        Employment History
      </Button>
      <Collapse isOpen={isOpen} className="m-1">
        <div id="employmentform">

          <Row>
            <Col>
              {/* <CustomProfile 
              label="Client" 
              id="EH_CLIENT" 
              placeholder="" 
              name="EH_CLIENT"
               handleChange={handleChange}/> */}
               <FormGroup id="EH_CLIENT">
    <Label htmlFor="b_EH_CLIENT">Client:</Label>
    <Input
      type="text"
      placeholder=""
      id="b_EH_CLIENT"
      name="EH_CLIENT"
      onChange={handleChange}
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
  </FormGroup>
            </Col>
            <Col>
              {/* <CustomProfile
                label="Client Address"
                id="EH_CLIENTADD"
                name="EH_CLIENTADD"
                placeholder=""
                handleChange={handleChange}
              /> */}
              <FormGroup id="EH_CLIENTADD">
    <Label htmlFor="b_EH_CLIENTADD">Client Address:</Label>
    <Input
      type="text"
      placeholder=""
      id="b_EH_CLIENTADD"
      name="EH_CLIENTADD"
      onChange={handleChange}
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
  </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <CustomProfile
                label="Your working Client Email"
                id="EH_CLIENTMAIL"
                name="EH_CLIENTMAIL"
                placeholder=""
                handleChange={handleChange}
              /> */}
              <FormGroup id="EH_CLIENTMAIL">
    <Label htmlFor="b_EH_CLIENTMAIL">Manager Reference Email:</Label>
    <Input
      type="text"
      placeholder=""
      id="b_EH_CLIENTMAIL"
      name="EH_CLIENTMAIL"
      onChange={handleChange}
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
  </FormGroup>
            </Col>
            <Col>
              {/* <CustomProfile
                label="Vendor Name"
                id="EH_VENDORNAME"
                name="EH_VENDORNAME"
                placeholder=""
                handleChange={handleChange}
              /> */}
              <FormGroup id="EH_VENDORNAME">
    <Label htmlFor="b_EH_VENDORNAME">Vendor Name:</Label>
    <Input
      type="text"
      placeholder=""
      id="b_EH_VENDORNAME"
      name="EH_VENDORNAME"
      onChange={handleChange}
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
  </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <CustomProfile
                label="Vendor Phone"
                id="EH_VENDORPHONE"
                name="EH_VENDORPHONE"
                placeholder=""
                handleChange={handleChange}
              /> */}
              <FormGroup id="EH_VENDORPHONE">
    <Label htmlFor="b_EH_VENDORPHONE">Vendor Phone:</Label>
    <Input
      type="text"
      placeholder=""
      id="b_EH_VENDORPHONE"
      name="EH_VENDORPHONE"
      onChange={handleChange}
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
  </FormGroup>
            </Col>
            <Col>
              {/* <CustomProfile
                label="Vendor Mail"
                id="EH_VENDORMAIL"
                name="EH_VENDORMAIL"
                placeholder=""
                handleChange={handleChange}
              /> */}
              <FormGroup id="EH_VENDORMAIL">
    <Label htmlFor="b_EH_VENDORMAIL">Vendor Mail:</Label>
    <Input
      type="text"
      placeholder=""
      id="b_EH_VENDORMAIL"
      name="EH_VENDORMAIL"
      onChange={handleChange}
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
  </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
            {/* <FormGroup id="WA_issuedate">
            <Label htmlFor="WAb_issuedate">Issue Date:</Label>
            <input type="date" className="rounded" name="WA_ISSUEDATE" handleChange={handleChange} id="b_WAb_issuedate"/>   
            </FormGroup> */}
              {/* <CustomProfile 
              label="From" 
              id="EH_FROM" 
              text="date" 
              name="EH_VENDORFROM" 
              placeholder="" 
              handleChange={handleChange}/> */}
              <FormGroup id="EH_FROM">
    <Label htmlFor="b_EH_FROM">From:</Label>
    <Input
      type="date"
      placeholder=""
      id="b_EH_FROM"
      name="EH_VENDORFROM"
      onChange={handleChange}
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
  </FormGroup>
            </Col>
            <Col>
              {/* <CustomProfile 
              label="To" 
              id="EH_TO" 
              text="date" 
              name="EH_VENDORTO" 
              placeholder="" 
              handleChange={handleChange}/> */}
              <FormGroup id="EH_TO">
    <Label htmlFor="b_EH_TO">To:</Label>
    <Input
      type="date"
      placeholder=""
      id="b_EH_TO"
      name="EH_VENDORTO"
      onChange={handleChange}
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
  </FormGroup>
            </Col>
          </Row>
          <div id="employmentAppendBlock">

          </div>
        </div>
      </Collapse>
    </div>
  );
}

export default Profile;
