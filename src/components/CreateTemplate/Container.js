import React from "react";
import $ from 'jquery'
import Swal from 'sweetalert2'
import Presentation from "./Presentation";
import personalCheckData from './ElemData/personalCheckData'
import empHistoryData from './ElemData/empHistoryData'
import workAuthData from './ElemData/workAuthData'
import mailAddressData from './ElemData/mailingData'
import emContactData from './ElemData/emContactData'
import fire from '../Firebase/firebase'
import axios from 'axios'
class Container extends React.Component {
  state = {
    personalCheck :personalCheckData,
    empHistoryData:empHistoryData,
    workAuthData:workAuthData,
    mailAddressData:mailAddressData,
    emContactData:emContactData,
    email:""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }; 
  componentDidMount(){
    fire.auth().onAuthStateChanged((user)=>{
        if(user){
        
        }
        else{
            this.props.history.push("/login")
        }
      })
}

//capture email from admin
handleEmail=(e)=>{
  // this.setState({email:e.target.value})
}

//send user data to firebase 
sendMail=(email)=>{
// var userMail=this.state.email
var userMail=[email]
axios.post("/inviteuser",{
      ActionBy: localStorage.getItem("email"),
      maillist:userMail,
        })
        .then(res => {
            console.log(res)
            Swal.fire({
              icon:"success",
              toast:true,
              title: userMail+" has been invited successfully",
              position: 'top-end',
              showConfirmButton: false,
              
              showClass: {
                popup: ''
              },
              timer: 2500
            }) 
        }).catch(err => {
            console.log(err)
        })

       
}


//To add html content to firebase
  handleBoard = () => {
   
    console.log("done");
    const Post = $('#personalForm').html();
    const Mailing=$("#mailingform").html();
    const emergency=$("#emergencyform").html();
    const employment=$("#employmentform").html();
    const workauth=$("#workauthform").html();
    fire.firestore().collection("Template").doc("HtmlTemp").set({
      title: "Html template",
      content: "<br><h3>Personal Details</h3>"+Post+"<br><h3>Mailing Address</h3>"+Mailing+"<br><h3>Emergency Contact</h3>"+emergency+"<br><h3>Employment History</h3>"+employment+"<br><h3>Work Authorization</h3>"+workauth+"<br>"
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
    this.setState({PostTemp:Post})

  };

// To append new label and customize the new label
  handleLabel =(e)=> {
    console.log($("#newLabelType").val());
    console.log(e);
    const newLabelName = $("#newLabel").val();
    const newLableType = $("#newLabelType").val();
    let active=true;
    let label=newLabelName;
    switch (e) {
      case "personalAppend":
                            const personalfunction=()=>{
                            let customizeId=newLabelName.replace(/ /g,'');
                            let id='b_'+customizeId;
                            const pData={
                              label,
                              id,
                              active
                            }
                            let personalCheck=[...this.state.personalCheck,pData];
                             this.setState({
                                personalCheck
                            })
                            $("#personalAppendBlock").append("<div id='"+customizeId+"'><label>"+newLabelName+"</label><br/><input type='"+newLableType+"' id='b_"+newLabelName+"newlabel' class='newlabelstyle' required/></div>");
                          
                            
                          }
                          
                          personalfunction();
                            break;
      case "employmentAppend":const employementfunction=()=>{
                              let customizeId=newLabelName.replace(/ /g,'');
                              let id="EH_"+customizeId;
                              let empData={
                                label,
                                id,
                                active
                              }
                              let empHistory=[...this.state.empHistoryData,empData];
                              this.setState({
                                  empHistoryData:empHistory
                              })
                              $("#employmentAppendBlock").append("<div id='"+customizeId+"'><label>"+newLabelName+"</label><br/><input type='"+newLableType+"' id='b_"+newLabelName+"' class='newlabelstyle' required/></div>");
                             
                               }
                               employementfunction();
                              break;
      case "workAuthAppend":const workauthfunction=()=>{
                            let customizeId=newLabelName.replace(/ /g,'');
                            let id="WA_"+customizeId;
                            const workData={
                              label,
                              id,
                              active
                            }
                            let workAuth=[...this.state.workAuthData,workData];
                            this.setState({
                                workAuthData:workAuth
                            })
                            $("#workAuthAppendBlock").append("<div id='"+customizeId+"'><label>"+newLabelName+"</label><br/><input type='"+newLableType+"' id='WA_"+newLabelName+"newlabel' class='newlabelstyle' required/></div>");
                           
                            }
                            workauthfunction();
                            break;
      case "mailAddressAppend":const mailAddressfunction=()=>{
                              let customizeId=newLabelName.replace(/ /g,'');
                              let id="MA_"+customizeId;
                              const mailData={
                                label,
                                id,
                                active
                              }
                              let mailAdd=[...this.state.mailAddressData,mailData];
                              this.setState({
                                  mailAddressData:mailAdd
                              })
                              $("#mailAppendBlock").append("<div id='"+customizeId+"'><label>"+newLabelName+"</label><br/><input type='"+newLableType+"' id='b_"+newLabelName+"' class='newlabelstyle' required/></div>");
                             
                              }                      
                            mailAddressfunction();
                             break;
      case "contactAppend":const emContactfunction=()=>{
                              let customizeId=newLabelName.replace(/ /g,'');
                              let id="EC_"+customizeId;
                              const mailData={
                                label,
                                id,
                                active
                              }
                              let mailAdd=[...this.state.emContactData,mailData];
                              this.setState({
                                  emContactData:mailAdd
                              })
                              $("#contactAppendBlock").append("<div id='"+customizeId+"'><label>"+newLabelName+"</label><br/><input type='"+newLableType+"' id='EC_"+newLabelName+"newlabel' class='newlabelstyle' required/></div>");
                             
                              }                      
                            emContactfunction();
                             break;
      default:return null;
        
    }
  };
  handleCustomPersonal = id=> {
    console.log("s");
    this.setState(prevState=>{
      const updatePersonalCheck=prevState.personalCheck.map(eachCheck=>{
        if(eachCheck.id===id){
          console.log(eachCheck.active)
          eachCheck.active=!eachCheck.active
          // $("#"+id.slice(2)).?
          if(!eachCheck.active)
            $("#"+id.slice(2)).slideUp();
          else 
            $("#"+id.slice(2)).slideDown();  
          
        }
        return eachCheck
      })
      return {
        personalCheck:updatePersonalCheck
      }
    })
  };
  handleCustomAddress = id=> {
    this.setState(prevState=>{
      const updateAddress=prevState.mailAddressData.map(eachCheck=>{
        if(eachCheck.id===id){
          console.log(eachCheck.active)
          eachCheck.active=!eachCheck.active
          // $("#"+id.slice(2)).?
          if(!eachCheck.active)
            $("#"+id.slice(3)).slideUp();
          else 
            $("#"+id.slice(3)).slideDown();  
          
        }
        return eachCheck
      })
      return {
        mailAddressData:updateAddress
      }
    })
  };
  handleCustomContact = id=> {
    this.setState(prevState=>{
      const updateContact=prevState.emContactData.map(eachCheck=>{
        if(eachCheck.id===id){
          console.log(eachCheck.active)
          eachCheck.active=!eachCheck.active
          // $("#"+id.slice(2)).?
          if(!eachCheck.active)
            $("#"+id.slice(3)).slideUp();
          else 
            $("#"+id.slice(3)).slideDown();  
          
        }
        return eachCheck
      })
      return {
        emContactData:updateContact
      }
    })
  };
  handleCustomHistory = id=> {
    this.setState(prevState=>{
      const updateEmpHistory=prevState.empHistoryData.map(eachCheck=>{
        if(eachCheck.id===id){
          console.log(eachCheck.active)
          eachCheck.active=!eachCheck.active
          // $("#"+id.slice(2)).?
          console.log(id.slice(3));
          if(!eachCheck.active)
            $("#"+id.slice(3)).slideUp();
          else 
            $("#"+id.slice(3)).slideDown();  
          
        }
        return eachCheck
      })
      return {
        empHistoryData:updateEmpHistory
      }
    })
  };
  handleCustomWorkAuth = id=> {
    console.log("sux");
    this.setState(prevState=>{
      const updateWorkAuth=prevState.workAuthData.map(eachCheck=>{
        if(eachCheck.id===id){
          console.log(eachCheck.active)
          eachCheck.active=!eachCheck.active
          // $("#"+id.slice(2)).?
          if(!eachCheck.active)
            $("#"+id.slice(3)).slideUp();
          else 
            $("#"+id.slice(3)).slideDown();  
          
        }
        return eachCheck
      })
      return {
        workAuthData:updateWorkAuth
      }
    })
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.ids.b_fname_check);
  };
  render() {
    
    return (
      <div>
        <Presentation
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleCustomPersonal={this.handleCustomPersonal}
          handleCustomAddress={this.handleCustomAddress}
          handleCustomContact={this.handleCustomContact}
          handleCustomHistory={this.handleCustomHistory}
          handleCustomWorkAuth={this.handleCustomWorkAuth}
          personalCheck={this.state.personalCheck}
          empHistoryData={this.state.empHistoryData}
          workAuthData={this.state.workAuthData}
          mailAddressData={this.state.mailAddressData}
          emContactData={this.state.emContactData}
          handleLabel={this.handleLabel}
          handleBoard={this.handleBoard}
          PostTemp={this.state.PostTemp}
          handleEmail={this.handleEmail}
          sendMail={this.sendMail}
          {...this.state}
        />
      </div>
    );
  }
}

export default Container;
