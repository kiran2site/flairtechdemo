import React, { useState }  from 'react'
import { Button,Row,Col,Table,CustomInput,Badge,Popover,PopoverBody,PopoverHeader,Spinner } from 'reactstrap';
import {Link} from 'react-router-dom'
import {Label,Tab,Menu,Dropdown,MenuItem,Input,Segment,Select} from 'semantic-ui-react'
import $ from 'jquery'


function ActiveUsers(props){
  return(
      <EmployeesSort active props={props.props} userData={props.activeUserData}/>
  )
}

function InActiveUsers(props){
  return(
    <div>
      <EmployeesSort inactive props={props.props} userData={props.InActiveUserData}/>
    </div>
  )
}

function SuspendedUsers(props){
  return(
    <div>
      <EmployeesSort suspended props={props.props} userData={props.SuspendedUserData}/>
    </div>
  )
}

function AllUsers(props){
  console.log(props)
  return(
    <div>
      <EmployeesSort all props={props.props} userData={props.props.userData}/>
    </div>
  )
}

function SelectedUsers(props){
  console.log(props)
  return(
    <div>
        <EmployeesSort selected props={props.props} userData={props.SelectedUserData}/>
    </div>
  )
}

function EmployeesSort(props){
  const {handleMailSort,sortTableValues,handleSearchChange,adminRole,managerRole,handleSelectActive,onHover,onHoverLeave,handleSearch,handleSingleMail,handleSelectAll,userCheck,handleSelectSuspended,handleSelectInactive}=props.props
    
  let rowData=props.userData.map(user=>{
      return{
          name:user.name,
          mail:user.mail,
          phone:user.phone,
          branch:user.branch,
          employeeId:user.employeeId,
          project:user.project,
          reportingmanager:user.reportingmanager,
          employeestatus:user.employeestatus,
          usertype:user.usertype,
          jobtitle:user.jobtitle,
          employeetype:user.jobtitle,
          department:user.department,
          userstatus:user.userstatus,
      }
     
  })

  console.log(props)
  const handleChange=(e)=>{
    let activeMails=[]
    let inActiveMails=[]
    let suspendedMails=[]
    let allMails=[]
    let selectedArr=[]
      if(props.all){ 
        props.userData.forEach(user=>{
              allMails.push(user.mail)
      }) 
        if(e.target.checked){
           handleMailSort(allMails)  
        }
        else{
           handleMailSort([])
        }
      }
      else if(props.active){

        props.userData.forEach(user=>{
            if(user.userstatus=="Active")
                activeMails.push(user.mail)
        })
        if(e.target.checked){
          handleMailSort(activeMails)  
        }
        else{
          handleMailSort([])
        }
         
      }
      else if(props.suspended){
        props.userData.forEach(user=>{
          if(user.userstatus=="Suspended")
              suspendedMails.push(user.mail)
          })
        if(e.target.checked){
          handleMailSort(suspendedMails)  
        }
        else{
          handleMailSort([])
        }
      }
      else if(props.inactive){
        props.userData.forEach(user=>{
          if(user.userstatus=="Inactive")
              inActiveMails.push(user.mail)
      })
        if(e.target.checked){
          handleMailSort(inActiveMails)  
        }
        else{
          handleMailSort([])
        }
      }
      else if(props.selected){
          props.userData.forEach(item=>{
            selectedArr.push(item)
          })
          if(e.target.checked){
            handleMailSort(selectedArr) 
          }
          else{
            handleMailSort([])
          }
      }
      else{

      }
  }

  const placeUsers=props.userData.map(user=>{
      if(!user) 
      return false
      if(adminRole==true||managerRole==true){
      return(
               
               <tbody>
                      <tr id="EmployeeRow">
                      <td><span id="emplist_name">{user.name}</span></td>
                      <td><span id="emplist_mail">{user.mail}</span></td>
                      <td><span id="emplist_phone">{user.phone}</span></td>
                      <td><span id="emplist_branch">{user.branch}</span></td>
                      <td><span id="emplist_id"><Link onMouseEnter={onHover}  onMouseLeave={onHoverLeave}  to={"/dashboard/console/employeelist/"+user.mail}><h5 id={user.mail}>{user.employeeId}</h5></Link></span></td>
                      <td><span id="emplist_project">{user.project}</span></td>
                      <td><span id="emplist_reportingmanager">{user.reportingmanager}</span></td>
                      <td><span id="emplist_status">{user.employeestatus}</span></td>
                      <td><span id="emplist_usertype">{user.usertype=="Manager"?<Label color='blue'>{user.usertype}</Label>:<React.Fragment>{user.usertype}</React.Fragment>}</span></td>
                      <td><span id="emplist_jobtitle">{user.jobtitle}</span></td>
                      <td><span id="emplist_employeetype">{user.employeetype}</span></td>
                      <td><span id="emplist_department">{user.department}</span></td>
                      <td><span id="emplist_userstatus">{user.userstatus=="Suspended"||user.userstatus=="Inactive"?<Label color={user.color}>{user.userstatus}</Label>:<Label color="green">{user.userstatus}</Label>}</span></td>
                      <td><CustomInput className="selectCheckBox" type="checkbox" id={"email:"+user.mail} onChange={()=>handleSingleMail(user.mail)} label="" checked={userCheck.includes(user.mail)}/></td>
                      </tr>
                  </tbody>
                 
                
      )
    }
  })

  const options = [
    { key: 'employee', text: 'Employees', value: 'employee' },
    { key: 'employeeID', text: 'Employee ID', value: 'employeeID' },
    { key: 'jobTitle', text: 'Job title', value: 'jobTitle' },
    { key: 'department', text: 'Department', value: 'department' },
    { key: 'employeeStatus', text: 'Employee Status', value: 'employeeStatus' },
    { key: 'userType', text: 'User type', value: 'userType' },


  ]
  return(
    <div>
       <Input
    action={
      <Dropdown onChange={sortTableValues} button basic floating options={options} defaultValue='employee' />
    }
    icon='search'
    iconPosition='left'
    placeholder='Search...'
    className="m-1"
    id="sortableContent"
    onChange={handleSearchChange}
  />
      <div id="popHere" className="tableFixHead employeelist w-100" style={{overflowX:"auto",height:"500px"}}>
       
       <table bordered className="rounded table table-fixed">
       <thead>
           <tr>
           <th>Name</th>
           <th>Mail ID</th>
           <th>Phone</th>
           <th>Branch</th>
           <th>Employee ID</th>
           <th>Project</th>
           <th>Reporting Manager</th>
           <th>Employee Status</th>
           <th>User type</th>
           <th>Job Title</th>
           <th>Employee Type</th>
           <th>Department</th>
           <th>User Status</th>
           <th><CustomInput type="checkbox" id="selectall" onChange={handleChange} label="Select all"/></th>
           </tr>
       </thead>
       {props.userData.length>0?placeUsers:null}
       </table>
       {props.userData.length>0||<div className="text-center ">No employees found!</div>} 
   </div>
    </div>
  )
}

function TabAlign(props) {
  const {userData,userCheck} = props.props
  console.log(props.props)
  let activeUserData=[]
  let InActiveUserData=[]
  let SuspendedUserData=[]
  let SelectedUserData=[]
  userData.forEach(item => {
    if(item.userstatus=="Active")
        activeUserData.push(item)
    if(item.userstatus=="Inactive")
        InActiveUserData.push(item)
    if(item.userstatus=="Suspended")
        SuspendedUserData.push(item)
    if(userCheck.includes(item.mail))
        SelectedUserData.push(item)    
    
  });
  console.log(SelectedUserData)
  const panes = [
    {
      menuItem: (
        <Menu.Item key='allusers'>
          All<Label>{userData.length}</Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane attached={false}><AllUsers props={props.props} /></Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key='activeusers'>
          Active<Label color="green">{activeUserData.length}</Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane attached={false}><ActiveUsers props={props.props} activeUserData={activeUserData}/></Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key='inactive'>
          Inactive<Label color="orange">{InActiveUserData.length}</Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane attached={false}><InActiveUsers props={props.props} InActiveUserData={InActiveUserData}/></Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key='suspended'>
          Suspended<Label color="red">{SuspendedUserData.length}</Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane attached={false}><SuspendedUsers props={props.props} SuspendedUserData={SuspendedUserData}/></Tab.Pane>,
    },
    {
      menuItem: (
        <Menu.Item key='selected'>
          Selected<Label color="black">{SelectedUserData.length}</Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane attached={false}><SelectedUsers props={props.props} SelectedUserData={SelectedUserData}/></Tab.Pane>,
    },
  ]
    return (
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    )
}

function Presentation(props) {
  const {handleSearch,found,adminRole,handleInvitedUsersAgain,managerRole,userRole,userImage,filterBy,userMails,showUser,onHover,popoverOpen,onHoverLeave,imageURL,handleSingleMail,handleSort,handleSelectAll,countList,userCheck,userData,InactiveCount,SuspendedCount,ActiveCount}=props
  return (
        <div>
            <div className="employeebox">   
                
                <div className="employeenav m-1">
                   <div className="d-flex justify-content-between ml-5 mr-5">
                       <div className="emp_glance " style={{height:"100px"}}>
                           {userImage?<img src={userImage} height="100" className="border"/>:<p>No Image</p>}
                            
                       </div>
                       <div className="emp_actions ">
                           {userCheck.length>0 ?<Dropdown
                            text='More options'
                            icon='options'
                            floating
                            labeled
                            button
                            className='icon bg-info text-light'
                          >
                            <Dropdown.Menu>
                              <Dropdown.Item
                                icon="stop circle"
                                text='Hold Timesheets'
                              />
                              <Dropdown.Item
                                color="blue"
                                icon="announcement"
                                text='Send Announcement'
                              />
                              <Dropdown.Item
                                icon="text width"
                                text='Send Text Message'
                              />
                              <Dropdown.Item
                                icon="mail"
                                text='Send Email'
                              />
                              <Dropdown.Item
                                onClick={handleInvitedUsersAgain}
                                icon="user plus"
                                text='Invite'
                              />
                            </Dropdown.Menu>
                          </Dropdown>
                          :
                          <Dropdown
                            text='More options'
                            icon='options'
                            floating
                            labeled
                            button
                            disabled
                            className='icon bg-info text-light'
                            title="Select users to use"
                          ></Dropdown>

                          
                        }
                       </div>
                   </div>
                  <TabAlign props={props}/>
                
                </div>
              
            </div>
        </div>
    )
}

export default Presentation
