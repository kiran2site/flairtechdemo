import React, { Component } from 'react'
import Presentation from './Presentation'
import fire from '../Firebase/firebase'
import FileUploader from "react-firebase-file-uploader";
class Container extends Component {
    componentDidMount(){
        fire.auth().onAuthStateChanged((user)=>{
            if(user){
                
            }
            else{
                this.props.history.push("/login")
            }
          })
    }

    clickFun=()=>{
    }
    
    handle=()=>{
        const addManager=fire.functions().httpsCallable("addAdminRole");
        addManager({email:"giri1@gmail.com"}).then(res=>{
            console.log(res)
        })

        let enable=fire.functions().httpsCallable("enableUser");
        enable({uid:"eshwarnadh345@gmail.com"}).then(
            console.log("wow")
        )
    }
 
    render() {
            const {userRole,adminRole,managerRole,email}=this.props
        return (
            <div>
               
                <Presentation userRole={userRole} adminRole={adminRole} managerRole={managerRole}/>
            </div>
        )
    }
}

export default Container
