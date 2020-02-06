import React, { useState } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import CustomPersonal from "./CustomPersonal";
import ModalC from '../ModalC/ToggleModal'
import Swal from 'sweetalert2'
const CustomProfile = props => {
  const {btnText,checkItems,handleCustom,handleLabel,newLabelIdMention}=props;
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  

  return (
    <div>
      <Button color="primary" onClick={toggle} className="w-100 m-1">
        {btnText}
      </Button>
      <Collapse isOpen={isOpen} className="m-1">
        <Card>
          <CardBody>
          {checkItems.map(PerEach=>{
            return <CustomPersonal label={PerEach.label} id={PerEach.id} handleCustom={handleCustom} check={PerEach.active}/>
          })}
          <ModalC handleLabel={handleLabel} newLabelIdMention={newLabelIdMention}/>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};

export default CustomProfile;
