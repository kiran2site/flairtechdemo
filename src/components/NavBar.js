import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import fire from './Firebase/firebase'
import Nopic from '../assets/flair-img/Nopic.png'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  import Logo from '../assets/logo.png'
import AfterLogin from './AfterLogin'
import BeforeLogin from './BeforeLogin'
import {withRouter,Redirect} from 'react-router-dom'

class Example extends React.Component {
  
  state={
    adminRole:false,
    managerRole:false,
    userRole:false,
    user:null,
    profile:"",
    email:""
  }
  componentDidMount(){
    this.authListener()
  }
  authListener=()=>{
    fire.auth().onAuthStateChanged((user)=>{
      console.log(user)
      if(user){
        console.log(user.email)
      this.setState({user:user})
      user.getIdTokenResult().then(tokenResult=>{
        if(tokenResult.claims.admin){
            this.setState({adminRole:true})
            this.setState({userRole:false})
        }
        else if(tokenResult.claims.manager){
          this.setState({managerRole:true})
          this.setState({userRole:false})
        }
        else{
          this.setState({userRole:true})
        }
      })
      fire.firestore().collection("Users").doc(user.email).get().then(snap=>{
        if(snap.data().imageURL==null){
          this.setState({profile:null})
        }
        this.setState({profile:snap.data().imageURL})
        this.setState({email:user.email})
      })
      }
      else if(user==null&&this.props.history.location.pathname.match("/dashboard/console/postform/")){
        console.log("yes");
      }
      else{
        const link =this.props.history;
        console.log(link)
         this.setState({user:null});

         this.props.history.push('/login')
      }
    })
    
  }
 logOut=()=>{
    fire.auth().signOut()
    this.authListener();
    // window.location.reload();
    
  }
  render(){
   
  return (
    
    <div>
      {/* {this.state.user?(<AfterLogin logOut={this.logOut}/>):(<BeforeLogin/>)}  */}
     
      <AfterLogin adminRole={this.state.adminRole} managerRole={this.state.managerRole} userRole={this.state.userRole} email={this.state.email} profile={this.state.profile} logOut={this.logOut} user={this.state.user}/>
  
      
    </div>
  );
  
    
}
}

export default withRouter(Example);
