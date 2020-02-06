import React from 'react'
import { FormGroup,Label,Input } from 'reactstrap'
function PersonalData(props){
  const {label,id,placeholder,name,handleChange}=props;
  return(
    <FormGroup id={id}>
    <Label htmlFor={id}>{label}:</Label>
    <Input
      type="text"
      placeholder={placeholder}
      id={"b_"+id}
      name={name}
      onChange={handleChange}
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
  </FormGroup>
  )
}

export default PersonalData