import React,{useState} from 'react'
import CustomProfile from './customProfile'
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
function TogglePersonal(){
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const handleChange=()=>{

  }
  return (
    <div>
      <Button color="secondary" onClick={toggle} className="w-100 m-1">
        Mailing Address
      </Button>
      <Collapse isOpen={isOpen} className="m-1">
      <div id="mailingform">

          <Row>
            <Col>
              {/* <CustomProfile
                label="Line1"
                id="MA_LINE1"
                placeholder=""
                name="MA_LINE1"
              /> */}
              <FormGroup id="MA_LINE1">
    <Label htmlFor="b_MA_LINE1">Line1<span className="req-field">*</span>:</Label>
    <Input
      type="text"
      placeholder=""
      id="b_MA_LINE1"
      name="MA_LINE1"
      onChange={handleChange}
      required
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
  </FormGroup>
            </Col>
            <Col>
              {/* <CustomProfile
                label="Line2"
                id="MA_LINE2"
                placeholder=""
                name="MA_LINE2"
              /> */}
              <FormGroup id="MA_LINE2">
    <Label htmlFor="firstName">Line2:</Label>
    <Input
      type="text"
      placeholder=""d
      id="b_MA_LINE2"
      name="MA_LINE2"
      onChange={handleChange}
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
  </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <CustomProfile
                label="City"
                id="MA_CITY"
                placeholder=""
                name="MA_CITY"
              /> */}
              <FormGroup id="MA_CITY">
    <Label htmlFor="b_MA_CITY">City<span className="req-field">*</span>:</Label>
    <Input
      type="text"
      placeholder=""
      id="b_MA_CITY"
      name="MA_CITY"
      onChange={handleChange}
      required
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
  </FormGroup>
            </Col>
            <Col>
              {/* <CustomProfile
                label="State"
                id="MA_STATE"
                placeholder=""
                name="MA_STATE"
              /> */}
              <FormGroup id="MA_STATE">
    <Label htmlFor="b_MA_STATE">State<span className="req-field">*</span>:</Label>
    <Input
      type="text"
      placeholder=""
      id="b_MA_STATE"
      name="MA_STATE"
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
                label="Zip"
                id="MA_ZIP"
                placeholder=""
                name="MA_ZIP"
              /> */}
              <FormGroup id="MA_ZIP">
    <Label htmlFor="b_MA_ZIP">Zip<span className="req-field">*</span>:</Label>
    <Input
      type="text"
      placeholder=""
      id="b_MA_ZIP"
      name="MA_ZIP"
      onChange={handleChange}
      required
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
  </FormGroup>
            </Col>
            <Col>
              {/* <CustomProfile
                label="Country"
                id="MA_COUNTRY"
                placeholder=""
                name="MA_COUNTRY"
              /> */}
              <FormGroup id="MA_COUNTRY">
    <Label htmlFor="b_MA_COUNTRY">Country<span className="req-field">*</span>:</Label>
    <Input
      type="text"
      placeholder=""
      id="b_MA_COUNTRY"
      name="MA_COUNTRY"
      onChange={handleChange}
      required
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
  </FormGroup>
            </Col>
          </Row>
          {/* <Row>
            <Col>
               <FormGroup id="MA_FROM">
              <Label htmlFor="b_MA_FROM">From<span className="req-field">*</span>:</Label>
              <Input
                type="date"
                placeholder=""
                id="b_MA_FROM"
                name="MA_FROM"
                onChange={handleChange}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
            </FormGroup>
            </Col>
            <Col>
            <FormGroup id="MA_TO">
              <Label htmlFor="b_MA_TO">To<span className="req-field">*</span>:</Label>
              <Input
                type="date"
                placeholder=""
                id="b_MA_TO"
                name="MA_TO"
                onChange={handleChange}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
            </FormGroup>
              
            </Col>
          </Row> */}
          <div id="mailAppendBlock">

          </div>
        
        </div>
      </Collapse>
    </div>
  );
 
}

export default TogglePersonal