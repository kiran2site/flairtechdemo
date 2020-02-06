import React from 'react'
import {Table,CustomInput,Spinner,Input} from 'reactstrap'
import {Button,Icon} from 'semantic-ui-react'
import fire from '../Firebase/firebase'
import FileUploader from 'react-firebase-file-uploader'
import $ from 'jquery'
import PrintID from './PrintID'

// import 
function Presentation(props) {
    const {editData,saveData,isEditing,handleChange,sam,storageRef,handleUploadError,handleUploadSuccess,handleProgress,editWorkAuth,editWorkAuthDonen,handleUploadStart,addWorkAuth,deleteWorkAuth,workAuth,empHistory,addEmpHistory,editEmpFun,editEmpDone,deleteEmpRow,deleteEmerRow,addEmergency,emergencyPlace,editEmergencyDone,editEmergency,editEmergencyFun,individual,adminRole,managerRole,loadButton,uid,suspendedUser,loadEnableBtn,status,SuspendUser,EnableUser,Role,userRole,promote,demote,imageURL,userstatus,email,workauth,personal,veridicId,mailingaddress,emergencycontact,employementhistory}=props;
    console.log(emergencyPlace)
    const EmerUI=emergencyPlace.map(item=>{
        return(
            <tr id={"emerRow"+item.id}>
            <td><span><input   id={item.key} readonly="readonly" onChange={handleChange} defaultValue={item.name}/></span></td>
            <td><input  id={item.key} readonly="readonly" onChange={handleChange} defaultValue={item.phone}/></td>
            <td><input  id={item.key} readonly="readonly" onChange={handleChange} defaultValue={item.emailid}/></td>
            <td id={"emerRowConsole"+item.id}><button className="ver-btn" id={item.id} onClick={editEmergencyFun}>Edit</button>&nbsp;&nbsp;<button className="ver-btn" id={item.id}  onClick={editEmergencyDone}>Save</button>&nbsp;&nbsp;<button onClick={deleteEmerRow} id={item.id} className="ver-btn">Delete</button></td>
            </tr>
        )
    })

    const EmpUI=empHistory.map(empItem=>{
        return(
            <tr id={"empRow"+empItem.id}>
            <td ><span id={"empRowValclient"+empItem.id}>{empItem.client==""?<span className="text-danger">Enter client name</span>:empItem.client}</span><br/><span id={"empRowValaddress"+empItem.id}>{empItem.clientaddress==""?<span  className="text-danger">Enter client address</span>:empItem.clientaddress}</span><br/><span  id={"empRowValWorkingemail"+empItem.id}>{empItem.yourworkingmailid==""?<span  className="text-danger">Enter working mail id</span>:empItem.yourworkingmailid}</span></td>
            <td><span id={"empRowValVendorName"+empItem.id}>{empItem.vendorname==""?<span className="text-danger">Enter vendor name</span>:empItem.vendorname}</span><br/><span id={"empRowValVendorPhone"+empItem.id}>{empItem.vendorphone==""?<span  className="text-danger">Enter vendor phone</span>:empItem.vendorphone}</span><br/><span id={"empRowValVendorEmail"+empItem.id}>{empItem.vendoremail==""?<span  className="text-danger">Enter vendor email</span>:empItem.vendoremail}</span></td>
            <td><span id={"empRowValFrom"+empItem.id}>{empItem.from==""?<span  className="text-danger">from date</span>:empItem.from}</span></td>
            <td><span id={"empRowValTo"+empItem.id}>{empItem.to==""?<span  className="text-danger">to date</span>:empItem.to}</span></td>
            <td id={"empRowConsole"+empItem.id}><button className="ver-btn" id={empItem.id} onClick={editEmpFun}>Edit</button>&nbsp;&nbsp;<button className="ver-btn" id={empItem.id}  onClick={editEmpDone}>Save</button>&nbsp;&nbsp;<button onClick={deleteEmpRow} id={empItem.id} className="ver-btn">Delete</button></td>
            </tr>
        )
    })

    const WorkUI=workAuth.map(workItem=>{
        return(
            <tr id={"workRow"+workItem.id}>
            <td><span id={"empRowValType"+workItem.id}>{workItem.work_type==""?<span className="text-danger">Type</span>:workItem.work_type}</span></td>
            <td><span id={"empRowValNumber"+workItem.id}>{workItem.work_number==""?<span className="text-danger">Number</span>:workItem.work_number}</span></td>
            <td></td>
            <td><span id={"empRowValIssue"+workItem.id}>{workItem.work_issue==""?<span className="text-danger">Issue date</span>:workItem.work_issue}</span></td>
            <td><span id={"empRowValExpiry"+workItem.id}>{workItem.work_exp==""?<span className="text-danger">Expiry date</span>:workItem.work_exp}</span></td>
            <td id={"empRowConsole"+workItem.id}><Button  size="mini"  onClick={deleteWorkAuth} id={workItem.id} color="red"><Icon name="delete"/>Delete</Button></td>
            </tr>
        )
    })
   
    return (
        <div>
          
            <div className="row m-2 rounded shadow mt-4">
                <div className="user-glance col-lg-3 mt-3 mb-4 w-100 border">
                   {/* <div className="container-item"> */}
                   {/* <script></script> */}
                    <div className="user-image border"  id="profile">
                    { imageURL?<img src={imageURL} className="image"  alt="employeeimage" width="180" height="180"/> : <Icon name="user" size="massive"/>}
                    <div  >
                    <FileUploader
                    className="btn btn-dark w-100"
                    accept="image/*"
                   change={sam}
                    randomizeFilename
                    storageRef={storageRef}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                />
                    {/* <div className="editprofile" ><Icon   */}
                    {/* //    onClick={sam} */}
                    {/* name="edit" inverted size="big" /> */}
                    
                    </div>
                    </div>
                    <div>
                    {/* {isEditing?
                        <Button onClick={saveData}><Icon name="save outline"/>Save changes</Button>:
                        <Button onClick={editData}><Icon name="pencil"/>Edit</Button>
                        } */}
                    </div>
                    <Table borderless className="profile_idcard">
                        <tr className="p-2">
                            <td><b>Employee ID:</b></td>
                            <td>{veridicId}</td>   
                        </tr>
                        <tr  className="p-2">
                            <td><b>Name: </b></td>
                            <td>{personal.firstname+" "+personal.middlename}</td>
                        </tr>
                        <tr  className="p-2">
                            <td><b>Mail ID:</b></td>
                            <td>{email}</td>
                        </tr>
                        <tr  className="p-2">
                            <td><b>Phone: </b></td>
                            <td>{personal.phonenumber}</td>
                    
                        </tr>
                        <tr  className="p-2">
                            <td><b>Address: </b></td>
                            <td>{mailingaddress.line1+" "+mailingaddress.line2+","+mailingaddress.city+","+mailingaddress.state+","+mailingaddress.country+","+mailingaddress.zip}</td>
                        </tr>
                        </Table>
                    <PrintID veridicId={veridicId} personal={personal} email={email} imageURL={imageURL} mailingaddress={mailingaddress} />

                    {/* Set any one , either user or manager */}
                    {/* {!individual?<div>
                    {adminRole?(
                         <div className="user-actions mt-3">
                        {Role=="User"? <button className="btn btn-info w-50" onClick={promote}>{loadButton?<Spinner size="sm"/>:("Promote as Manager")}</button>:<button className="btn btn-info w-50" onClick={demote}>{loadButton?<Spinner size="sm"/>:("Demote as User")}</button>}
                          </div>
                    ):null}
                    {!userRole?
                    <div className="mt-3">
                    {status=="Suspended"?<button className="btn btn-danger w-50" onClick={()=>EnableUser(email)}>{loadEnableBtn?<Spinner size="sm"/>:("Enable this User")}</button>:<button className="btn btn-danger w-50" onClick={()=>SuspendUser(email)}>{loadEnableBtn?<Spinner size="sm"/>:("Suspend this User")}</button>}
                   </div>
                   :null    
                   }
                    </div>
                     :null} */}
                </div>

                <div className="user-data col-lg-9 mt-4">
                <div className="user-glance col-md-5 ml-auto  mt-3 mb-4">
                    {/* Set any one , either user or manager */}
                    {isEditing?
                        <Button className="w-100" onClick={saveData}><Icon name="save outline"/>Save changes</Button>:
                        <Button className="w-100" onClick={editData}><Icon name="pencil"/>Edit</Button>
                        }
                    {!individual?<div>
                         <div className="user-actions mt-3">
                        {Role=="User"? <span>{loadButton?<button className="btn btn-secondary w-100 no-drop" disabled><Spinner size="sm"/></button>:<button className="btn btn-secondary w-100" onClick={promote}>Promote as Manager</button>}</span>:<span>{loadButton?<button className="btn btn-secondary w-100 no-drop" disabled><Spinner disabled size="sm"/></button>:<button className="btn btn-secondary w-100" onClick={demote}>Demote as User</button>}</span>}
                          </div>
                    <div className="mt-3">
                    {status=="Suspended"?<span>{loadEnableBtn?<button className="btn btn-danger w-100 no-drop" disabled><Spinner size="sm"/></button>:<button className="btn btn-danger w-100" onClick={()=>EnableUser(email)}>Enable this User</button>}</span>:<span>{loadEnableBtn?<button className="btn btn-danger w-100 no-drop" disabled><Spinner size="sm"/></button>:<button className="btn btn-danger w-100" onClick={()=>SuspendUser(email)}>Suspend this User</button>}</span>}
                   </div>
                    </div>
                     :null}
                </div>
                <div>
                    <h3 className=""><u>Personal Information:</u></h3>
                    <div className="tableFixHead">
                    <Table bordered>
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Employee ID</th>
                            <th>Email Id</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Branch</th>
                            <th>Department</th>
                            <th>Employee status</th>
                            <th>Job title</th>
                            <th>Reporting Manager(Supervisor)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{personal.firstname+" "+personal.middlename}</td>
                                <td>{veridicId}</td>
                                <td>{email}</td>
                                <td>{personal.phonenumber}</td>
                                <td>{mailingaddress.line1+" "+mailingaddress.line2+","+mailingaddress.city+","+mailingaddress.state+","+mailingaddress.country+","+mailingaddress.zip}</td>
                                <td>{personal.branch}</td>
                                <td>{personal.department}</td>
                                <td>{personal.employeestatus}</td>
                                <td>{personal.jobtitle}</td>
                                <td>{personal.reportingmanager}</td>
                            </tr>
                        </tbody>
                    </Table>
                    </div>
                </div>
                <div className="user-emergencycontact mt-3">
                        <h3 className=""><u>Emergency Contact:</u></h3>
                            <Table bordered>
                                <thead>
                                    <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email Id</th>
                                    <th>{isEditing?<Button size="mini" color="blue" onClick={addEmergency}><Icon inverted name="add"/>Add</Button>:null}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {EmerUI}
                                   
                                </tbody>
                            </Table>
                </div>
                <div className="user-employementhistory mt-3">
                    <h3><u>Employement History:</u></h3>
                            <Table bordered>
                                <thead>
                                    <tr>
                                    <th>Client Name <br/>Address<br/>Working Client Email</th>
                                    <th>Vendor Name<br/>Vendor Phone<br/>Vendor Email</th>
                                    <th>From Date</th>
                                    <th>To Date</th>
                                    <th>{isEditing?<Button size="mini" color="blue" onClick={addEmpHistory}><Icon inverted name="add"/>Add</Button>:null}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <tr>
                                    <td>{employementhistory.client}<br/>{employementhistory.clientaddress}<br/>{employementhistory.yourworkingmailid}</td>
                                    <td>{employementhistory.vendorname}<br/> {employementhistory.vendorphone }<br/>{employementhistory.vendoremail}</td>
                                    <td>{employementhistory.from}</td>
                                    <td>{employementhistory.to}</td>    
                                    <td><a href="#">Edit</a>&nbsp;&nbsp;<a href="#">Delete</a></td>
                                    </tr> */}
                                    {EmpUI}
                                </tbody>
                            </Table>
                </div>
                <div className="user-workauth mt-3">
                    <h3><u>Work Authorization:</u></h3>
                            <Table bordered>
                                <thead>
                                    <tr>
                                    <th>Type</th>
                                    <th>Number</th>
                                    <th>Document</th>
                                    <th>Issue Date</th>
                                    <th>Expiry Date</th>
                                    <th>{isEditing?<Button size="mini" color="blue" onClick={addEmpHistory}><Icon inverted name="add"/>Add</Button>:null}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <tr>
                                    <td>{workauth.work_type}</td>
                                    <td>{workauth.work_number}</td>
                                    <td></td>
                                    <td>{workauth.work_issue}</td>
                                    <td>{workauth.work_exp}</td>
                                    <td><a href="#">Edit</a>&nbsp;&nbsp;<a href="#">Delete</a></td>
                                    </tr> */}
                                    {WorkUI}
                                </tbody>
                            </Table>
                </div>
                </div>
                
            </div>
        </div>
    )
}

export default Presentation
