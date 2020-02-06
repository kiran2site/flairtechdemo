import React, { Component } from 'react'
import fire from '../Firebase/firebase'
import Presentation from './Presentation'
import {withRouter} from 'react-router-dom'
import Swal from 'sweetalert2'
import $ from 'jquery'
import axios from 'axios'

class Container extends Component {
    state={
        placeHtml:null,
        userMail:""
    }
   

    handleClick=(email)=>{
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

    handleChange=(e)=>{
        console.log(e.target.value);
        const userMail=e.target.value;
        this.setState({userMail:userMail})
   
    }
    componentDidMount(){
        console.log(this.props)
        fire.firestore().collection('Template').doc('HtmlTemp').get().then((snap)=>{
            // $("#placeit").html("<div>"+snap.data().content+"<div>")
            this.setState({
                placeHtml:snap.data().content
            })
            // $("#placeHtml").html(snap.data().content);
          })
          fire.auth().onAuthStateChanged((user)=>{
            if(user){
            
            }
            else{
                this.props.history.push("/login")
            }
          })
    }

    render() {

       

        return (
            <div className="mt-5">
                <Presentation adminRole={this.props.adminRole} placeHtml={this.state.placeHtml} handleChange={this.handleChange} handleClick={this.handleClick}/>
            </div>
        )
    }
}

export default withRouter(Container)
