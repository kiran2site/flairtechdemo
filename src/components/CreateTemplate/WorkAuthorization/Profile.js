import React,{useState} from 'react'
import CustomProfile from './CustomProfile'
import {
  FormGroup,
  Form,
  CustomInput,
  Label,
  Button,
  Collapse,
  Input,
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
        Work Authorization
      </Button>
      <Collapse isOpen={isOpen} className="m-1">
        <div id="workauthform">
          <Row>
            <Col>
              {/* <CustomProfile
                label="Type"
                id="WAtype"
                extra="WA"
                name="WA_TYPE"
                placeholder=""
                handleChange={handleChange}
              /> */}
<FormGroup id="WAtype">
    <Label htmlFor="b_WAtype">Type<span className="req-field">*</span>:</Label>
    <Input
      type="text"
      placeholder=""
      id="b_WAtype"
      name="WA_TYPE"
      onChange={handleChange}
      required
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
  </FormGroup>
            </Col>
            <Col>
              {/* <CustomProfile
                label="Number"
                id="WAnum"
                extra="WA"
                name="WA_NUMBER"
                placeholder=""
                handleChange={handleChange}
              /> */}
              <FormGroup id="WAnum">
    <Label htmlFor="b_WAnum">Number<span className="req-field">*</span>:</Label>
    <Input
      type="text"
      placeholder=""
      id="b_WAnum"
      name="WA_NUMBER"
      onChange={handleChange}
      required
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
  </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
            <FormGroup id="WA_issuedate">
            <Label htmlFor="WAb_issuedate">Issue Date<span className="req-field">*</span>:</Label>
            <input 
            type="date" className="rounded" name="WA_ISSUEDATE" handleChange={handleChange} id="b_WAb_issuedate" required/>   
            </FormGroup>
            </Col>
            <Col>
            <FormGroup id="WA_expdate">
            <Label htmlFor="WAb_expdate">Exp Date<span className="req-field">*</span>:</Label>
            <input type="date" className="rounded" name="WA_EXPDATE" handleChange={handleChange} required id="b_WAb_expdate"/>   
            </FormGroup>

            </Col>
          </Row>
          <Row>
            <Col>
            <FormGroup id="WAfile">
            <Label for="WA_file">Upload Copy<span className="req-field">*</span></Label>
            <CustomInput type="file" id="WA_file" handleChange="Upload Copy"name="WA_FILE" required />
            </FormGroup>
            </Col>
            <Col>
            </Col>
          </Row>
          <div id="workAuthAppendBlock">

        </div>
          
          </div>
      </Collapse>
    </div>
  );
 
}

export default Profile