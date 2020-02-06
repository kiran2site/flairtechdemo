import React from 'react'
import { FormGroup,Label,Input } from 'reactstrap'
function PersonalData(props){
  const {label,id,placeholder,handleChange,name,extra}=props;
  return(
    <FormGroup id={id}>
    <Label htmlFor={id}>{label}:</Label>
    <Input
      type="text"
      name={name}
      placeholder={placeholder}
      id={extra+id}
      onChange={handleChange}
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
  </FormGroup>
  )
}

export default PersonalData