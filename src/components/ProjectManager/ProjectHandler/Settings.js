import React from "react";
import { MDBDataTable } from "mdbreact";
import {CustomInput} from 'reactstrap';
import $ from 'jquery'
import {Button} from 'semantic-ui-react'
import axios from 'axios'


function Settings(props) {
  const { usersAccess,setAccess,projectId } = props
  
  function saveAccessLevel() {
    axios.post(`http://localhost:5001/flair-d7b59/us-central1/api/giveaccess`,{
      projectId:projectId,
      projectAccess:usersAccess
    })
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  }

  const data = {
    
    columns: [
   {   
        label: "FullName",
        field: "FullName",
        sort: "asc",
      },
      {
        label: "Create",
        field: "Create",
        sort: "asc"
      },
      {
        label: "Read",
        field: "Read",
        sort: "asc"

      },
      {
        label: "Update",
        field: "Update",
        sort: "asc"
      },
      {
        label:"Delete",
        field: "Delete",
        sort: "asc"
      }     
    ],
    rows: usersAccess.map(user=>{
      return{
        FullName: user.user,
        Create: <CustomInput label="" type="checkbox" id={"0"+user.user} onChange={()=>setAccess("create",user.user)} checked={user.create}/>,
        Read: <CustomInput label="" type="checkbox" id={"1"+user.user} onChange={()=>setAccess("read",user.user)} checked={user.read}/>,
        Update: <CustomInput label="" type="checkbox" id={"2"+user.user} onChange={()=>setAccess("update",user.user)} checked={user.update}/>,
        Delete: <CustomInput label="" type="checkbox" id={"3"+user.user} onChange={()=>setAccess("delete",user.user)} checked={user.delete}/>,
      }
    })
  };

  return(
   <div>

  <center><h1>Project member settings</h1></center>
<MDBDataTable 
          striped 
          bordered 
           data={data} 
           />
           <div>
              <Button onClick={saveAccessLevel}>Save changes</Button>
           </div>
</div>
  ) 
};

export default Settings;
