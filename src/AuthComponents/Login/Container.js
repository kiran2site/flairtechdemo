import React, { Component } from 'react'
import Presentation from './Presentation'
import fire from '../../components/Firebase/firebase'
import axios from 'axios'
import Swal from 'sweetalert2'
class Container extends Component {
    state={
        email:"",
        pass:"",
        signing:false,
        loading:false,
        isPasswordShown: false
      }
      togglePasswordVisibility=()=>{
        this.setState({ isPasswordShown: !this.state.isPasswordShown });
      }
      handleResetPass=(email)=>{
        var actionCodeSettings = {
          url: 'https://flair-d7b59.firebaseapp.com/',
          handleCodeInApp: false
        };
        fire.auth().sendPasswordResetEmail(email,actionCodeSettings)
        .then(res => {
          console.log(res)
          Swal.fire({
              icon:"success",
              title: "Check your inbox for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.",
              showClass: {
                popup: ''
              },
            })
      }).catch(err => {
        console.log(err)
        if(err.code=="auth/user-not-found"){
         return Swal.fire({
            icon:"error",
            title: "No record of your id in veridic solutions",
            showClass: {
              popup: ''
            },
          })
        }
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
      })

      }
        handleChange=(e)=>{
          this.setState({
            [e.target.id]:e.target.value
          })
        }
        componentDidMount(){
          this.setState({loading:false})
          fire.auth().onAuthStateChanged((user)=>{
              if(user){
              this.props.history.push("/dashboard");
              this.setState({loading:false})
              }
              else{
                  this.props.history.push("/login")
                this.setState({user:null});
                this.setState({loading:false})
              }
            })
          }
      
        login=(e)=>{
          e.preventDefault();
          this.setState({signing:true})
          console.log(this.state)
          fire.auth().signInWithEmailAndPassword(this.state.email,this.state.pass).then(()=>{
           return  this.props.history.push("/dashboard")
          })
          .catch((error=>{
            console.log(alert(error))
            this.setState({signing:false})
          }))
        }

        
    render() {
        return (
            <div>
                <Presentation
                 handleResetPass={this.handleResetPass}
                handleChange={this.handleChange}
                login={this.login}
                signing={this.state.signing}
                showPassword={this.togglePasswordVisibility}
                isPasswordShown={this.state.isPasswordShown}
                {...this.state}
                />
            </div>
        )
    }
}

export default Container
