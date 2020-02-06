import React, { Component } from 'react'
import Presentation from './Presentation'
import Axios from 'axios'
import fire from '../../Firebase/firebase'
class Container extends Component {
    state={
        projectList:[],
        fetchMails:true,
        options:[],
        userMails:[],
        mailsLoaded:false,
    }
    
    componentDidMount=()=>{
        const { adminRole,email,managerRole,userRole,projectListData,loading } = this.props
       if(projectListData){
           let projects=[];
           let data=projectListData
           if(!loading){
           if(!adminRole){
               let projectIdList=[]
                   // pushing project ids to the particular user
               if(managerRole){
                    data.forEach(project=>{
                        if(email==project.data().createdBy){
                        if(projects.indexOf(project.id)==-1){
                            projectIdList.push(project.id)
                        }
                    }
                })
               }
               if(userRole){
                    data.forEach(project=>{
                        project.data().Users.forEach(item=>{
                            if(email == item.user){
                            if(projects.indexOf(project.id)==-1){
                                projectIdList.push(project.id)
                            }
                        }
                        })
                        
                })
               }
            
            // to get projects and its data
            data.forEach(project=>{
                projectIdList.map(projectList=>{
                    if(projectList==project.id){
                        projects.push({
                            id:project.id,
                            clientname:project.data().title,
                            supervisor:project.data().supervisor,
                            startdate:project.data().startdate,
                            enddate:project.data().enddate,
                            status:project.data().status
                        })
                    }
                })
            })
           }
           else{
            data.forEach(project=>{
                projects.push({
                    id:project.id,
                    clientname:project.data().title,
                    supervisor:project.data().supervisor,
                    startdate:project.data().startdate,
                    enddate:project.data().enddate,
                    status:project.data().status
                })
            })
           }
           }
           this.setState({projectList:projects})
           
       }

       Axios.get(`/activeusers`)
       .then(data=>{   
           let mailData=data.data
        let userMails= mailData.map(mail=>{
               return {
                   key:mail,
                   text:mail,
                   value:mail
               }
          }) 
         this.setState({userMails})
         this.setState({
           options:userMails,
           fetchMails:false,
           mailsLoaded:true
         })
       })
       .catch(err=>{
           console.log(err)
       })
    }

    handleProject=(e)=>{
        
    }
    render() {
        return (
            <div>
                <Presentation
                {...this.state}
                userRole={this.props.userRole}
                email={this.props.email}
                />
            </div>
        )
    }
}

export default Container
