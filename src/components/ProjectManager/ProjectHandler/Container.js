import React, { Component } from 'react'
import Presentation from './Presentation'
import axios from 'axios'
import fire from '../../Firebase/firebase'
import {List} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {Spinner} from 'reactstrap'
import $ from 'jquery'
class Container extends Component {
    state={
        project:{},
        activeIndex1:0,
        usersAccess:[],
        placeUsers:[],
        userList:[],
        projectId:"",
        loading:true
    }
    componentDidMount=()=>{
        console.log(this.props)
        let projectId=this.props.match.params.projectId
        this.setState({projectId})
        fire.firestore().collection("Projects")
        .doc(projectId)
        .onSnapshot(project=>{  
            let data=project.data()
            this.setState({project:data})
            this.setState({usersAccess:data.Users})
            
        this.setState({loading:false})
            let users=[]
            users=data.Users.map(user=>user.user)
            this.setState({userList:users})
            let placeUsers=users.map(user=>{    
                    return <Link to={`/dashboard/console/employeelist/${user}`}><List>{user}</List></Link>
             })
            this.setState({placeUsers})
        })
    
    }

    handleClick1 = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex1 } = this.state
        const newIndex = activeIndex1 === index ? -1 : index
    
        this.setState({ activeIndex1: newIndex })
      }
      
    setAccess=(key,email)=>{
        this.state.usersAccess.map(user=>{
            if(email==user.user){
                switch (key) {
                    case "create":this.setState(prevState=>{
                        const updateAccess=prevState.usersAccess.map(item=>{
                            if(email==item.user){
                                item.create=!item.create
                            }
                            return item
                        })
                        return {
                            usersAccess:updateAccess
                        }
                    })
                        
                     break;
                     case "update":this.setState(prevState=>{
                        const updateAccess=prevState.usersAccess.map(item=>{
                            if(email==item.user){
                                item.update=!item.update
                            }
                            return item
                        })
                        return {
                            usersAccess:updateAccess
                        }
                    })  
                    break;
                    case "read":this.setState(prevState=>{
                        const updateAccess=prevState.usersAccess.map(item=>{
                            if(email==item.user){
                                item.read=!item.read
                            }
                            return item
                        })
                        return {
                            usersAccess:updateAccess
                        }
                    })  
                    break;  
                    case "delete":this.setState(prevState=>{
                        const updateAccess=prevState.usersAccess.map(item=>{
                            if(email==item.user){
                                item.delete=!item.delete
                            }
                            return item
                        })
                        return {
                            usersAccess:updateAccess
                        }
                    })  
                    break;    
                    default:
                        break;
                }
            }
        })
    }
    render() {
        return (
            <div>
               {
                   this.state.loading?<Spinner className="ml-auto"/>:(
                <Presentation
                {...this.state}
                handleClick1={this.handleClick1}
                addMember={this.addMember}
                setAccess={this.setAccess}
                />
                   )
                }
            </div>
        )
    }
}

export default Container
