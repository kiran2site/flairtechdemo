import React, { Component } from 'react'
import Presentation from './Presentation'
import axios from 'axios'
import firebase from "../../components/Firebase/firebase"
import Swal from 'sweetalert2'
class Container extends Component {
    state={
        helperEight:true,
        helperNum:"",
        helperLower:"",
        oldPass:"",
        newPass:"",
        confirmPass:"",
        email:"",
        helperText:false,
        isSetting:false,
    }

    componentDidMount=()=>{
        this.setState({email:this.props.email})
    }
    handleOldPass=(e)=>{
        let value=e.target.value;
        this.setState({oldPass:value})

    }

    handleSetPass=(e)=>{
        let value=e.target.value;
        this.setState({newPass:value})
        if(value.length<8){
            return this.setState({helperEight:true})
        }
        this.setState({helperEight:false})
    }

    handleConfirmPass=(e)=>{
        let value=e.target.value;
        this.setState({confirmPass:value})
        if(value.length<8){
            return this.setState({helperEight:true})
        }
        this.setState({helperEight:false})
    }
    handleSetNewPass=()=>{
        let newPass=this.state.newPass;
        let confirmPass=this.state.confirmPass;
        if(newPass!==confirmPass){
            return this.setState({helperText:true})
        }
        if(newPass.length<1||confirmPass.length<1)
            return  Swal.fire({
                icon:"error",
                toast:true,
                title:"Invalid entry",
                position: 'top-end',
                showConfirmButton: false,
                
                showClass: {
                  popup: ''
                },
                timer: 2500
              })
        this.setState({helperEight:false})
        this.setState({helperText:false})
        this.setState({isSetting:true})
        let user=firebase.auth().currentUser;
        user.updatePassword(newPass)
        .then(()=>{
            this.setState({isSetting:false})
            Swal.fire({
                icon:"success", 
                toast:true,
                title:"Password changed successfully!",
                position: 'top-end',
                showConfirmButton: false,
                
                showClass: {
                  popup: ''
                },
                timer: 2500
              })
        })
        .catch(err=>{
            this.setState({isSetting:false})
            Swal.fire({
                icon:"error",
                toast:true,
                title:"Please re-login to change password",
                position: 'top-end',
                showConfirmButton: false,
                
                showClass: {
                  popup: ''
                },
                timer: 2500
              })
        })
    }
    render() {
        return (
            <div>
                <Presentation
                handleSetPass={this.handleSetPass}
                handleOldPass={this.handleOldPass}
                handleConfirmPass={this.handleConfirmPass}
                handleSetNewPass={this.handleSetNewPass}
                {...this.state}
                />
            </div>
        )
    }
}

export default Container
