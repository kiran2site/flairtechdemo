import React from 'react'
import {FormGroup , CustomInput, Label} from 'reactstrap'
function CustomPersonal(props){
  const {id,label,handleCustom,check}=props;
  return(
    <FormGroup>
          <CustomInput type="checkbox" id={id} label={label} onChange={()=>handleCustom(id)} checked={check}/>
    </FormGroup>
  )
}

export default CustomPersonal