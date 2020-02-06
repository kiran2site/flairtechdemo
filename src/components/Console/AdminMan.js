import React from 'react'
import AddUser from "../../assets/flair-img/add_user.png"
import Activate from "../../assets/flair-img/activate.png"
import InActivate from "../../assets/flair-img/inactivate.png"
import Update from "../../assets/flair-img/update.png"
import User from "../../assets/flair-img/user.png"
import ChangePass from "../../assets/flair-img/changepass.png"
import EmpList from "../../assets/flair-img/emplist.png"
import Template from "../../assets/flair-img/template.png"
import {Link} from 'react-router-dom'
import fire from '../Firebase/firebase'
class AdminMan extends React.Component{
    state={
        adminRole:false,
        managerRole:false,
        userRole:true,
        options:[]
    }
    componentDidMount(){
        this.authListener()
      }
      authListener=()=>{
        fire.auth().onAuthStateChanged((user)=>{
          if(user){
            console.log(user.email)
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
          }
          else{
            const link =this.props.history;
            console.log(link)
    
             this.props.history.push('/login')
          }
        })
        
      }
    render(){
       
    const adminActions=[
        {
            text:"Create Template",
            img:Template,
            linkTo:"/dashboard/console/createtemplate"  
        },
        {
          text:"Create User",
          img:AddUser  ,
          linkTo:"/dashboard/console/createuser"  
      },
      {
        text:"Employee List",
        img:EmpList  ,
        linkTo:"/dashboard/console/employeelist"  
    },
      {
          text:"Change Password",
          img:ChangePass  ,
          linkTo:"/dashboard/console/changepassword"  
      }
      ,
      {
          text:"Project Management",
          img:null  ,
          linkTo:"/dashboard/console/projectmanagement"  
      }
    ]

    const managerActions=[
        {
          text:"Create User",
          img:AddUser  ,
          linkTo:"/dashboard/console/createuser"  
      },
      {
        text:"Employee List",
        img:EmpList  ,
        linkTo:"/dashboard/console/employeelist"  
      },
      {
          text:"Change Password",
          img:ChangePass  ,
          linkTo:"/dashboard/console/changepassword"  
      }
    ]

    const userActions=[
      {
          text:"Change Password",
          img:ChangePass  ,
          linkTo:"/dashboard/console/changepassword"  
      }
    ]

    // another method to authorize is to create a function and use that declaration setState should be done inside the fucntion
  
    return (
        <div className="admin-man-items mt-5 ml-auto mr-auto border rounded">
           
            {this.state.adminRole?<div>
             {   adminActions.map(action=>{
            return(     
            <div className="m-4 rounded">
                <div className="create-user row p-4 rounded">
                    <div className="col m-1">
                        <img src={action.img} height="200"/>
                    </div>
                    <div className="col text-center m-1">
                        <Link to={action.linkTo}><button className="btn btn-outline-dark p-4 w-75">{action.text}</button></Link>
                    </div>
                </div>
            </div>
     
     )
    })}
            </div>:(<div></div>)}

            {/*Manager actions  */}
            {this.state.managerRole?<div>
             {   managerActions.map(action=>{
            return(     
            <div className="m-4 rounded">
                <div className="create-user row p-4 rounded">
                    <div className="col m-1">
                        <img src={action.img} height="200"/>
                    </div>
                    <div className="col text-center m-1">
                        <Link to={action.linkTo}><button className="btn btn-outline-dark p-4 w-75">{action.text}</button></Link>
                    </div>
                </div>
            </div>
     
     )
    })}
            </div>:(<div></div>)}

            {/* User actions */}

            {this.state.userRole?<div>
             {   userActions.map(action=>{
            return(     
            <div className="m-4 rounded">
                <div className="create-user row p-4 rounded">
                    <div className="col m-1">
                        <img src={action.img} height="200"/>
                    </div>
                    <div className="col text-center m-1">
                        <Link to={action.linkTo}><button className="btn btn-outline-dark p-4 w-75">{action.text}</button></Link>
                    </div>
                </div>
            </div>
     
     )
    })}
            </div>:(<div></div>)}
        </div>
        
    )
    
}
}

export default AdminMan
