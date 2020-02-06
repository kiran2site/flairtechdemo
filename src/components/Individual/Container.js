import React, { Component } from 'react'
import Presentation from './Presentation'
import fire from '../Firebase/firebase'
import {Spinner} from 'reactstrap'

import Swal from 'sweetalert2'
import $ from 'jquery'
import Axios from 'axios'
let greatestId=0;
let owner=localStorage.getItem("email")
class Container extends Component {
    state={
        uid:"",
        imageURL:"",
        email:"",
        Role:"User",
        status:"",
        image:null,
        progress:0,
        url:'',
        editEmergency:false,
        individual:false,
        adminRole:false,
        managerRole:false,
        userRole:false,
        loadButton:false,
        tryAgain:false,
        personal:{},
        emergencycontact:{},
        emergencyPlace:[],
        empHistory:[],
        workAuth:[],
        employementhistory:{},
        workauth:{},
        mailingaddress:{},
        veridicId:"",
        loadEnableBtn:false,
        userstatus:"",
        suspendedUser:false,
        isLoading:true,
        EmerId:30,
        EmpId:30,
        WorkId:30,
        isEditing:false,
        notRegistered:false,
    }
    

    highestId=(id)=>{
        if(id>greatestId)
            greatestId=id;
    }

    
    getUserData=(email)=>{
        fire.firestore().collection("Users").doc(email).onSnapshot(snap=>{
            let data=snap.data();
            if(data.status=="Inactive"){
                this.setState({notRegistered:true})
                this.setState({isLoading:false})
                return false
            }
            this.setState({Role:data.Role})
            this.setState({personal:data.personal})
            //emergency contact
            data.emergencycontact.map(id=>this.highestId(id.id))
            this.setState({EmerId:greatestId})
            greatestId=0;
            let pushEmer=this.state.emergencyPlace;
            pushEmer=data.emergencycontact
            this.setState({emergencyPlace:pushEmer})
            //employement history
            data.employmenthistory.map(id=>this.highestId(id.id))
            this.setState({EmpId:greatestId})
            greatestId=0;
            let pushEmp=this.state.empHistory;
            pushEmp=data.employmenthistory
             //work auth
             data.workauth.map(id=>this.highestId(id.id))
             this.setState({WorkId:greatestId})
             greatestId=0;
             let pushWork=this.state.workAuth;
             pushWork=data.workauth
             this.setState({workAuth:pushWork})
             //
             for (let key in pushEmp){
                 console.log(pushEmp[key])
                 pushEmp[key]={...pushEmp[key],key}
             }
             console.log(pushEmp)
            this.setState({empHistory:pushEmp})
            this.setState({employementhistory:data.employmenthistory})
            this.setState({mailingaddress:data.mailingaddress})
            this.setState({workauth:data.workauth})
            this.setState({veridicId:data.veridicID})
            this.setState({userstatus:data.userstatus})
            this.setState({imageURL:data.imageURL})
            this.setState({status:data.status})
            this.setState({isLoading:false})
        })
    }
    componentDidMount=()=>{
        console.log(this.props)
        this.setState({adminRole:this.props.adminRole})
        this.setState({managerRole:this.props.managerRole})
        this.setState({userRole:this.props.userRole})

        console.log(this.props)
        fire.firestore().collection("Users").doc("sunnychow90@gmail.com").get()
        .then(data=>{
            console.log(data.data())
        })
        .catch(err=>{
            console.log(err)
        })
        fire.auth().onAuthStateChanged((user)=>{        
            if(user){
                user.getIdTokenResult().then(tokenResult=>{
                    if(tokenResult.claims.admin){
                        this.setState({adminRole:true})
                    }
                })
                if(this.props.userRole||this.props.managerRole){
                    this.setState({individual:true})
                    let email=user.email;
                    this.setState({email})
                    this.getUserData(email)
                }
                else{
                    let email=this.props.match.params.email;
                    this.setState({email})
                    this.getUserData(email);
                }
            }
            else{
                this.props.history.push("/login")
            }
          })
    }

                                                    ////////edit table///////

    ////////////////// emergency contact
    // to append new row in emergency contact section
    addEmergency=()=>{
        let pushEmer=this.state.emergencyPlace;
        let id=this.state.EmerId;
        id++;
        this.setState({EmerId:id})
        let pushItems={
            emailid:"",
            id:id,
            name:"",
            phone:"",
        }
        pushEmer.push(pushItems)
        this.setState({emergencyPlace:pushEmer})
    }

    // delete row from emergency contact section
    deleteEmerRow=(e)=>{
        let id=e.target.id;
        let arr=this.state.emergencyPlace;
        for(let i=0;i<arr.length;i++){
            if(arr[i].id==id){
                arr.splice(i,1)
                fire.firestore().collection("Users").doc(this.state.email)
                .update({
                    emergencycontact:arr
                })
                .then(
                    Swal.fire({
                        icon:"success",
                        toast:true,
                        title: "Deleted!",
                        position: 'bottom-end',
                        showConfirmButton: false,
                        
                        showClass: {
                          popup: ''
                        },
                        timer: 2500
                      })
                )
                .catch(err=>{
                    console.log(err)
                })
               
                return this.setState({emergencyPlace:arr})
            }
        }
    }


    editEmergencyFun=(e)=>{
        let id=e.target.id;
        console.log(id)
        this.setState({editEmergency:true})
        $("#emerRow"+id).addClass("edit_data")
        $("#emerRowVal1"+id).removeAttr("readonly","readonly")
        $("#emerRowVal2"+id).removeAttr("readonly","readonly")
        $("#emerRowVal3"+id).removeAttr("readonly","readonly")
    }

    editEmergencyDone=(e)=>{
        let id=e.target.id;
        this.setState({editEmergency:false})
        $("#emerRow"+id).removeClass("edit_data shadow")
        $("#emerRowVal1"+id).attr("readonly","readonly")
        $("#emerRowVal2"+id).attr("readonly","readonly")
        $("#emerRowVal3"+id).attr("readonly","readonly")

        return console.log($("#emerRowVal1"+id).val())
        let val1=$("#emerRowVal1"+id).text();
        let val2=$("#emerRowVal2"+id).text();
        let val3=$("#emerRowVal3"+id).text();
        console.log(val1,val2,val3)
        let NoValCount=0;
        if(val1=="Enter name"){
            val1="";
            NoValCount++;
        }
        if(val2=="Enter phone"){
            val2="";
            NoValCount++;
        }
        if(val3=="Enter emailid"){
            val3="";
            NoValCount++;
        }
        if(NoValCount==8)   return Swal.fire({
            icon:"error",
            toast:true,
            title: "Nothing to save",
            position: 'bottom-end',
            showConfirmButton: false,
            
            showClass: {
              popup: ''
            },
            timer: 2500
          })
        let pushData={
            name:val1,
            phone:val2,
            emailid:val3,
            id:id
        }
        let arr=this.state.emergencyPlace;
        console.log(arr)
        for(let i=0;i<arr.length;i++){
            console.log(arr[i].id,id)
            if(arr[i].id==id){
                arr[i]=pushData
                console.log(arr[i])
                fire.firestore().collection("Users").doc(this.state.email)
                .update({
                    emergencycontact:arr
                })
                .then( 
                    Swal.fire({
                    icon:"success",
                    toast:true,
                    title: "Saved successfully!",
                    position: 'bottom-end',
                    showConfirmButton: false,
                    
                    showClass: {
                      popup: ''
                    },
                    timer: 2500
                  })
                  )
                .catch(err=>{
                    console.log(err)
                })
               
                return this.setState({emergencyPlace:arr})
            }
        }
    }


    //////////////employement history

    editEmpFun=(e)=>{
        let id=e.target.id;
        $("#empRow"+id).addClass("edit_data")
        $("#empRowValclient"+id).attr("contentEditable","true")
        $("#empRowValaddress"+id).attr("contentEditable","true")
        $("#empRowValWorkingemail"+id).attr("contentEditable","true")
        $("#empRowValVendorName"+id).attr("contentEditable","true")
        $("#empRowValVendorPhone"+id).attr("contentEditable","true")
        $("#empRowValVendorEmail"+id).attr("contentEditable","true")
        $("#empRowValFrom"+id).attr("contentEditable","true")
        $("#empRowValTo"+id).attr("contentEditable","true")
        $("#empRowConsole"+id).attr("contentEditable","false")
    }

    editEmpDone=(e)=>{
        let id=e.target.id;
        $("#empRow"+id).removeClass("edit_data shadow")
        $("#empRow"+id).attr("contentEditable","false")
        $("#empRowValclient"+id).attr("contentEditable","false")
        $("#empRowValaddress"+id).attr("contentEditable","false")
        $("#empRowValWorkingemail"+id).attr("contentEditable","false")
        $("#empRowValVendorName"+id).attr("contentEditable","false")
        $("#empRowValVendorPhone"+id).attr("contentEditable","false")
        $("#empRowValVendorEmail"+id).attr("contentEditable","false")
        $("#empRowValFrom"+id).attr("contentEditable","false")
        $("#empRowValTo"+id).attr("contentEditable","false")
        let valClient=$("#empRowValclient"+id).text();
        let valAddress=$("#empRowValaddress"+id).text();
        let valWorkEmail=$("#empRowValWorkingemail"+id).text();
        let valVendorName=$("#empRowValVendorName"+id).text();
        let valVendorPhone=$("#empRowValVendorPhone"+id).text();
        let valVendorEmail=$("#empRowValVendorEmail"+id).text();
        let valFrom=$("#empRowValFrom"+id).text();
        let valTo=$("#empRowValTo"+id).text();
        let NoValCount=0;
        if(valClient=="Enter client name")
         {   valClient=""
            NoValCount++;}
        if(valAddress=="Enter client address")
         {   valAddress="";NoValCount++;}
        if(valWorkEmail=="Enter working mail id")
           { valWorkEmail="" ;NoValCount++;}
        if(valVendorName=="Enter vendor name")
           { valVendorName="";NoValCount++;}    
        if(valVendorPhone=="Enter vendor phone")
           { valVendorPhone="";NoValCount++;}    
        if(valVendorEmail=="Enter vendor email")
           { valVendorEmail="" ;NoValCount++;}  
        if(valFrom=="from date")
           { valFrom="" ;NoValCount++;} 
        if(valTo=="to date")
           { valTo="" ;NoValCount++;} 
        if(NoValCount==8)   return Swal.fire({
            icon:"error",
            toast:true,
            title: "Nothing to save",
            position: 'bottom-end',
            showConfirmButton: false,
            
            showClass: {
              popup: ''
            },
            timer: 2500
          })
        let pushData={
            client:valClient,
            vendorname:valVendorName,
            from:valFrom,
            to:valTo,
            clientaddress:valAddress,
            vendoremail:valVendorEmail,
            vendorphone:valVendorPhone,
            yourworkingmailid:valWorkEmail,
            id:id
        }
        console.log(pushData)
        let arr=this.state.empHistory;
        console.log(arr)
        for(let i=0;i<arr.length;i++){
            console.log(arr[i].id,id)
            if(arr[i].id==id){
                arr[i]=pushData
                console.log(arr[i])
                fire.firestore().collection("Users").doc(this.state.email)
                .update({
                    employmenthistory:arr
                })
                .then(
                    Swal.fire({
                        icon:"success",
                        toast:true,
                        title: "Saved successfully!",
                        position: 'bottom-end',
                        showConfirmButton: false,
                        
                        showClass: {
                          popup: ''
                        },
                        timer: 2500
                      })
                )
                .catch(err=>{
                    console.log(err)
                })
               
                return this.setState({empHistory:arr})
            }
        }

        
        
    }

    // to append new row in employement history section
    addEmpHistory=()=>{
        let pushEmp=this.state.empHistory;
        let id=this.state.EmpId;
        id++;
        this.setState({EmpId:id})
        let pushItems={
            client:"",
            vendorname:"",
            from:"",
            to:"",
            clientaddress:"",
            vendoremail:"",
            vendorphone:"",
            yourworkingmailid:"",
            id:id
        }
        pushEmp.push(pushItems)
        console.log(pushEmp)
        this.setState({empHistory:pushEmp})
    }

     // delete row from emergency contact section
     deleteEmpRow=(e)=>{
        let id=e.target.id;
        let arr=this.state.empHistory;
        for(let i=0;i<arr.length;i++){
            if(arr[i].id==id){
                arr.splice(i,1)
                fire.firestore().collection("Users").doc(this.state.email)
                .update({
                    employmenthistory:arr
                })
                .then(
                    Swal.fire({
                        icon:"success",
                        toast:true,
                        title: "Deleted!",
                        position: 'bottom-end',
                        showConfirmButton: false,
                        
                        showClass: {
                          popup: ''
                        },
                        timer: 2500
                      })
                )
                .catch(err=>{
                    console.log(err)
                })
                
                return this.setState({empHistory:arr})
            }
        }
    }

    ////////////////////////////work auth

    editWorkAuth=(e)=>{
        let id=e.target.id;
        $("#workRow"+id).addClass("edit_data")
        $("#empRowValType"+id).attr("contentEditable","true")
        $("#empRowValNumber"+id).attr("contentEditable","true")
        $("#empRowValIssue"+id).attr("contentEditable","true")
        $("#empRowValExpiry"+id).attr("contentEditable","true")
       
    }

    editWorkAuthDone=(e)=>{
        let id=e.target.id;
        $("#workRow"+id).removeClass("edit_data")
        $("#empRowValType"+id).attr("contentEditable","false")
        $("#empRowValNumber"+id).attr("contentEditable","false")
        $("#empRowValIssue"+id).attr("contentEditable","false")
        $("#empRowValExpiry"+id).attr("contentEditable","false")
        let valType=$("#empRowValType"+id).text();
        let valNumber=$("#empRowValNumber"+id).text();
        let valIssue=$("#empRowValIssue"+id).text();
        let valExpiry=$("#empRowValExpiry"+id).text();
        let NoValCount=0;
        if(valType=="Type"){
            valType="";
            NoValCount++;
        }
        if(valNumber=="Number"){
            valNumber="";
            NoValCount++;
        }
        if(valIssue=="Issue date"){
            valIssue="";
            NoValCount++;
        }
        if(valExpiry=="Expiry date"){
            valExpiry="";
            NoValCount++;
        }

        if(NoValCount==4)   return Swal.fire({
            icon:"error",
            toast:true,
            title: "Nothing to save",
            position: 'bottom-end',
            showConfirmButton: false,
            
            showClass: {
              popup: ''
            },
            timer: 2500
          })

          let pushData={
            work_exp:valExpiry,
            work_from:"",
            work_issue:valIssue,
            work_to:"",
            work_number:valNumber,
            work_type:valType,
            work_vendormail:"",
            work_vendorphone:"",
            id:1
        }

        let arr=this.state.workAuth;
        console.log(arr)
        for(let i=0;i<arr.length;i++){
            console.log(arr[i].id,id)
            if(arr[i].id==id){
                arr[i]=pushData
                console.log(arr[i])
                fire.firestore().collection("Users").doc(this.state.email)
                .update({
                    workauth:arr
                })
                .then(
                    Swal.fire({
                        icon:"success",
                        toast:true,
                        title: "Saved successfully!",
                        position: 'bottom-end',
                        showConfirmButton: false,
                        
                        showClass: {
                          popup: ''
                        },
                        timer: 2500
                      })
                )
                .catch(err=>{
                    console.log(err)
                })
               
                return this.setState({workAuth:arr})
            }
        }

    }

    addWorkAuth=()=>{
        let pushWork=this.state.workAuth;
        let id=this.state.WorkId;
        id++;
        this.setState({WorkId:id})
        let pushItems={
            work_exp:"",
            work_from:"",
            work_issue:"",
            work_to:"",
            work_number:"",
            work_type:"",
            work_vendormail:"",
            work_vendorphone:"",
            id:id
        }
        pushWork.push(pushItems)
        console.log(pushWork)
        this.setState({workAuth:pushWork})
    }

    deleteWorkAuth=(e)=>{
        let id=e.target.id;
        let arr=this.state.workAuth;
        for(let i=0;i<arr.length;i++){
            if(arr[i].id==id){
                arr.splice(i,1)
                fire.firestore().collection("Users").doc(this.state.email)
                .update({
                    workauth:arr
                })
                .then(
                    Swal.fire({
                        icon:"success",
                        toast:true,
                        title: "Deleted!",
                        position: 'bottom-end',
                        showConfirmButton: false,
                        
                        showClass: {
                          popup: ''
                        },
                        timer: 2500
                      })
                )
                .catch(err=>{
                    console.log(err)
                })
                
                return this.setState({workAuth:arr})
            }
        }
    }
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
      this.setState({ isUploading: false });
      console.error(error);
    };
    handleUploadSuccess = filename => {
        console.log(filename)
      this.setState({ avatar: filename, progress: 100,isUploading:false});
      fire
        .storage()
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then(url => {
            //getting url of the image from the db
            this.setState({ avatarURL: url,upload:true});
            console.log(url)
           fire.firestore().collection("Users").doc(this.state.email).update({
               imageURL:url
           })
    });
    };

    //to enable user
    EnableUser=(email)=>{
        this.setState({loadEnableBtn:true})
        let perform={
            email:this.state.email,
            ActionBy:owner
        }
        Axios.post(`/enableuser`,perform)
        .then(res=>{
            console.log(res)
            if(res.data.success){
                this.setState({loadEnableBtn:false})
                fire.firestore().collection("Users").doc(email).update({
                    status:"Active"
                })

                Swal.fire({
                    icon:"success",
                    toast:true,
                    title: email+" has been enabled",
                    position: 'top-end',
                    showConfirmButton: false,
                    
                    showClass: {
                      popup: ''
                    },
                    timer: 2500
                  })
            }
            else{
                this.setState({loadEnableBtn:false})
                Swal.fire({
                    icon:"error",
                    toast:true,
                    title: "Please try again",
                    position: 'top-end',
                    showConfirmButton: false,
                    
                    showClass: {
                      popup: ''
                    },
                    timer: 2500
                  })
            }
        })
    }                                                           

    SuspendUser=(email)=>{
        this.setState({loadEnableBtn:true})
        let perform={
            email:this.state.email,
            ActionBy:owner
        }
        Axios.post(`/disableuser`,perform)
        .then(res=>{
            console.log(res)
            if(res.data.success){
                this.setState({loadEnableBtn:false})
                fire.firestore().collection("Users").doc(email).update({
                    status:"Suspended"
                })
                Swal.fire({
                    icon:"success",
                    toast:true,
                    title: email+" has been Suspended",
                    position: 'top-end',
                    showConfirmButton: false,
                    
                    showClass: {
                      popup: ''
                    },
                    timer: 2500
                  })
            }
            else{
                this.setState({loadEnableBtn:false})
                Swal.fire({
                    icon:"error",
                    toast:true,
                    title: "Please try again",
                    position: 'top-end',
                    showConfirmButton: false,
                    
                    showClass: {
                      popup: ''
                    },
                    timer: 2500
                  })
            }
        })
    }
    promote=(e)=>{
        this.setState({loadButton:true})
        const asManager=fire.functions().httpsCallable("addManagerRole");
        let perform={
            email:this.state.email,
            ActionBy:owner
        }
        Axios.post(`/promoteuser`,perform)
        .then(res=>{
            console.log(res.data.success)
            if(res.data.success){
                this.setState({loadButton:false})
                fire.firestore().collection("Users").doc(this.state.email)
                .update({
                    Role:"Manager"
                })
                Swal.fire({
                    icon:"success",
                    toast:true,
                    title: this.state.email+" has been promoted as Manager",
                    position: 'top-end',
                    showConfirmButton: false,
                    
                    showClass: {
                      popup: ''
                    },
                    timer: 2500
                  })
            }
            else{
                this.setState({loadButton:false})
                Swal.fire({
                    icon:"error",
                    toast:true,
                    title: "Please try again",
                    position: 'top-end',
                    showConfirmButton: false,
                    
                    showClass: {
                      popup: ''
                    },
                    timer: 2500
                  })
            }
        })
    }

    demote=()=>{
        this.setState({loadButton:true})
        let perform={
            email:this.state.email,
            ActionBy:owner
        }
        Axios.post(`/demoteuser`,perform)
        .then(res=>{
            if(res.data.success){
                this.setState({loadButton:false})
                fire.firestore().collection("Users").doc(this.state.email).update({
                    Role:"User"
                })
                Swal.fire({
                    icon:"success",
                    toast:true,
                    title: this.state.email+" has been demoted to user",
                    position: 'top-end',
                    showConfirmButton: false,
                    
                    showClass: {
                      popup: ''
                    },
                    timer: 2500
                  })
            }
            else{
                this.setState({loadButton:false})
                Swal.fire({
                    icon:"error",
                    toast:true,
                    title: "Please try again",
                    position: 'top-end',
                    showConfirmButton: false,
                    
                    showClass: {
                      popup: ''
                    },
                    timer: 2500
                  })
            }
        })
    }

    editData=()=>{
        this.setState({isEditing:true})
        console.log(this.state.workAuth,this.state.mailingaddress,this.state.empHistory)

    }

    handleChange=(e)=>{
        // this.setState({
        //     [e.target.name]:e.target.value
        // })
        console.log(e.target.item,e.target.value)
    }

    saveData=()=>{
        this.setState({isEditing:false})
    }
    render() {
        return (
            <div>
            
                {this.state.isLoading?<div className="mt-5 text-center"><Spinner style={{ width: '3rem', height: '3rem' }}  /></div>:
                    this.state.notRegistered?<p className="text-center p-3 bg-danger mt-5 w-75 rounded shadow ml-auto mr-auto text-white">Invitation link had sent to this person, but not yet registered!</p>:
                    (
                    <Presentation 
                    deleteEmerRow={this.deleteEmerRow} 
                    addEmergency={this.addEmergency} 
                    editEmergencyDone={this.editEmergencyDone} 
                    editEmergencyFun={this.editEmergencyFun} 
                    deleteEmpRow={this.deleteEmpRow}
                    addEmpHistory={this.addEmpHistory}
                    editEmpFun={this.editEmpFun}
                    editEmpDone={this.editEmpDone}
                    editWorkAuth={this.editWorkAuth}
                    editWorkAuthDone={this.editWorkAuthDone}
                    addWorkAuth={this.addWorkAuth}
                    deleteWorkAuth={this.deleteWorkAuth}
                    userRole={this.props.userRole} 
                    SuspendUser={this.SuspendUser}  
                    EnableUser={this.EnableUser} 
                    editData={this.editData}
                    saveData={this.saveData}
                    {...this.state} 
                    promote={this.promote} 
                    demote={this.demote}
                    sam={this.props.email}
                    randomizeFilename
                    storageRef={fire.storage().ref("images")}
                    handleUploadStart={this.handleUploadStart}
                   handleUploadError={this.handleUploadError}
                    handleUploadSuccess={this.handleUploadSuccess}
                    handleProgress={this.handleProgress}
                    handleChange={this.handleChange}
                    />
                    )
                }
            </div>
        )
    }
}

export default Container