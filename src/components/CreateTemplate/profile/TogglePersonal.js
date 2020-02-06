import React,{useState} from 'react'
import PersonalData from "./PersonalData";
import {
  FormGroup,
  Form,
  Input,
  Label,
  Button,
  Collapse,
  CustomInput,
  Row,
  Col
} from "reactstrap";
function TogglePersonal(props){
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const handleChange=()=>{

  }
  return (
    <div>
      <Button color="secondary" onClick={toggle} className="w-100 m-1">
        Personal Information
      </Button>
      <Collapse isOpen={isOpen} className="m-1">
      <div id="personalForm">
          <Row>
            <Col>
              {/* <PersonalData
                label="First name"
                id="b_fname"
                extra="PI"
                name="PI_fname"
                placeholder="Enter First name"
                handleChange={handleChange}
                fluid
              /> */}
              <FormGroup id="b_fname">
    <Label htmlFor="PIb_fname">First name<span className="req-field">*</span>:</Label>
    <Input
      type="text"
      name="PI_fname"
      placeholder="Enter First name"
      id="PIb_fname"
      onChange={handleChange}
      required="required"
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
 </FormGroup>
            </Col>
            <Col>
              {/* <PersonalData
                label="Middle name"
                id="b_mname"
                extra="PI"
                name="PI_mname"
                placeholder="Enter Middle name"
                handleChange={handleChange}

              /> */}
              <FormGroup id="b_mname">
    <Label htmlFor="PIb_mname">Middle name:</Label>
    <Input
      type="text"
      name="PI_mname"
      placeholder="Enter Middle name"
      id="PIb_mname"
      onChange={handleChange}
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
 </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <PersonalData
                label="Last name"
                id="b_lname"
                extra="PI"
                name="PI_lname"
                placeholder="Enter Last name"
                handleChange={handleChange}

              /> */}
              <FormGroup id="b_lname">
    <Label htmlFor="PIb_lname">Last name<span className="req-field">*</span>:</Label>
    <Input
      type="text"
      name="PI_lname"
      placeholder="Enter Last name"
      id="PIb_lname"
      onChange={handleChange}
      required="required"
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
 </FormGroup>
            </Col>
            <Col>
              {/* <PersonalData
                label="Email"
                id="b_mail"
                extra="PI"
                name="PI_email"
                placeholder="Enter mail id"
                handleChange={handleChange}

              /> */}
              <FormGroup id="b_mail">
    <Label htmlFor="PIb_mail">Email<span className="req-field">*</span>:</Label>
    <Input
      type="text"
      name="PI_email"
      placeholder="Enter mail id"
      id="PIb_mail"
      onChange={handleChange}
          />
    &nbsp;&nbsp;&nbsp;&nbsp;
 </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <PersonalData
                label="Phone"
                id="b_phone"
                extra="PI"
                name="PI_phone"
                placeholder="Enter Phone no"
                handleChange={handleChange}
                  
              /> */}
              <FormGroup id="b_phone">
    <Label htmlFor="PIb_phone">Phone<span className="req-field">*</span>:</Label>
    <Input
      type="text"
      name="PI_phone"
      placeholder="Enter Phone no"
      id="PIb_phone"
      onChange={handleChange}
      required="required"
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
 </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="b_depart">Department<span className="req-field">*</span></Label>
                <Input type="select" name="PI_department"  id="PIb_depart" onChange={handleChange} required="required">
                  <option>Java</option>
                  <option>DevOps/Cloud</option>
                  <option>Python</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
<Row>
          <Col>
              <FormGroup id="marital">
                <Label for="b_marital">Marital status<span className="req-field">*</span></Label>
                <Input type="select" name="PI_marital"   id="PIb_marital" onChange={handleChange} required="required">
                  <option value="">---</option>
                  <option value="married">Married</option>
                  <option value="married">Unmarried</option>
                </Input>
              </FormGroup>
            </Col>
          
            <Col>
              <FormGroup id="b_reportM">
                <Label for="b_report">Reporting manager<span className="req-field">*</span></Label>
                <Input type="select" name="PI_report"   id="PIb_report" onChange={handleChange} required="required">
                  <option>Siva Harsha T</option>
                  <option>Teja V</option>
                </Input>
              </FormGroup>
            </Col>
            </Row>
            <Row>
            <Col>
              <FormGroup id="b_branch">
                <Label for="b_branch">Branch<span className="req-field">*</span></Label>
                <Input type="select" name="PI_branch"   id="PIb_branch" onChange={handleChange}  required="required">
                  <option>Atlanta</option>
                  <option>--</option>
                </Input>
              </FormGroup>
            </Col>
          
          
            <Col>
              <FormGroup id="b_emp">
                <Label for="b_employ">Employee status<span className="req-field">*</span></Label>
                <Input type="select" name="PI_employment"   id="PIb_employ" onChange={handleChange} >
                  <option>Active</option>
                  <option>Inactive</option>
                </Input>
              </FormGroup>
            </Col>
                     </Row>
                    
          <div id="personalAppendBlock">

          </div>
        </div>
      </Collapse>
    </div>
  );
 
}

export default TogglePersonal