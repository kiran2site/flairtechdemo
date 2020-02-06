import React, { Component } from 'react'
import fire from '../../Firebase/firebase'
import Presentation from './Presentation'
import axios from 'axios'
import $ from 'jquery'
class Container extends Component {
    constructor(){
        super();
    }


      authListener=()=>{
        fire.auth().onAuthStateChanged((user)=>{
          if(user){
            console.log(user)
          this.props.history.push("/dashboard");
          }
        })
        
      }

    state={
        levelOneAuth:false,
        found:0,
        load:1,
        email:"",
        incorrectPass:false,
        AuthOneSuccess:false,
        htmlContent:"",
        PI_fname:"",
        PI_mname:"",
        PI_lname:"",
        PI_email:"",
        PI_phone:"",
        PI_department:"",
        PI_job:"",
        PI_report:"",
        PI_branch:"",
        PI_employment:"",
        PI_marital:"",
        PI_role:"",
        MA_LINE1:"",
        MA_LINE2:"",
        MA_CITY:"",
        MA_STATE:"",
        MA_ZIP:"",
        MA_COUNTRY:"",
        MA_FROM:"",
        MA_TO:"",
        EMC_name:"",
        EMC_phone:"",
        EMC_mail:"",
        EH_CLIENT:"",
        EH_CLIENTADD:"",
        EH_CLIENTMAIL:"",
        EH_VENDORNAME:"",
        EH_VENDORPHONE:"",
        EH_VENDORMAIL:"",
        EH_VENDORFROM:"",
        EH_VENDORTO:"",
        WA_TYPE:"",
        WA_NUMBER:"",
        WA_ISSUEDATE:"",
        WA_EXPDATE:"",
        WA_VENDORPHONE:"",
        WA_VENDORMAIL:"",
        WA_FROM:"",
        WA_TO:"",
        WA_FILE:""


    }
    componentDidMount=()=>{
        this.authListener()
        console.log(this.props.match.params.email);
        const email=this.props.match.params.email;
        this.setState({email:email})
        fire.firestore().collection('sendEmailVerify').doc(email).get()
            .then((querySnapshot)=> {
                let userExist=querySnapshot.data();
               if(userExist){
                        this.setState({levelOneAuth:userExist.status});
                        this.setState({found:1})
                        this.setState({load:0})
               }
                if(this.state.found<1)
                    this.setState({found:0})
                    this.setState({load:0})
            })
        
        fire.firestore().collection('Template').doc('HtmlTemp').get().then((snap)=>{
            $("#placeit").html(snap.data().content)
            this.setState({htmlContent:snap.data().content})
          })
    }

  
    
    LevelAuthOne=()=>{

    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    InvitationLink=()=>{
        
    }
    handleUser=(e)=>{
        e.preventDefault();
        const pass=document.getElementById("levelOneAuthPass").value;
        console.log(pass);
        const email=this.state.email;
        fire.firestore().collection('sendEmailVerify').doc(email).get().then((snap)=>{
            if(snap.data().Password==pass){
                this.setState({AuthOneSuccess:true})
            }  
            else{
                this.setState({AuthOneSuccess:false})  
                console.log("Level one password incorrect")
                this.setState({incorrectPass:true})
            }
        })
    }
    render() {
        
        return (
            <div>
                <Presentation 
                load={this.state.load} 
                levelOneAuth={this.state.levelOneAuth} 
                found={this.state.found} handleChange={this.handleChange} 
                handleSubmit={this.handleSubmit}
                email={this.state.email}
                handleUser={this.handleUser}
                AuthOneSuccess={this.state.AuthOneSuccess}
                htmlContent={this.state.htmlContent}
                incorrectPass={this.state.incorrectPass}
                email={this.state.email}
                />
            </div>
        )
    }
}

export default Container
