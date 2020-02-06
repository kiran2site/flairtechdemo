import React, { Component } from 'react'
import Presentation from './Presentation'
import axios from 'axios'
import Swal from 'sweetalert2'
import $ from 'jquery'
import firebase from '../../../../Firebase/firebase'
 class Container extends Component {
    state={
        taskInfo:{},
        taskViewLoader:true,
        commentLoading:true,
        open:false,
        dimmer:false,
        userList:[],
        UpdatedTask:[],
        createdAt:{},
        status:"",
        loading:false,
        isCompleted:"",
        type:"",
        title:"",
        startdate:"",
        enddate:"",
        priority:"",
        assignee:"",
        description:"",
        createdBy:"",
        userImages:[],
        projectId:"",
        taskId:"",
        commentBy:"",
        commentText:"",
        comments:[],
        commentBtnLoading:false,
    }

    componentDidMount=()=>
    {
        const {projectId,taskId} = this.props.match.params
        this.setState({
            projectId,
            taskId
        })
        let users=[]
        if(projectId&&taskId){
        axios.get(`/projects/${projectId}/tasks/${taskId}`)
        .then(data=>{
            this.setState({taskInfo:data.data,UpdatedTask:data.data})
            for(let key in data.data){
                this.setState({[key]:data.data[key]})
            }
            this.setState({taskViewLoader:false})
        })
        .catch(err=>{
            console.log(err)
        })
        axios.get(`/projects/${projectId}`)
        .then(data=>{
            
            data.data.Users.forEach(item=>{
                users.push(item.user)
            })
            this.setState({userList:users})
        })
        .catch(err=>{
            console.log(err)
        })
        firebase.firestore().collection("Projects")
        .doc(projectId)
        .collection("Tasks")
        .doc(taskId)
        .collection("Comments")
        .orderBy("createdAt","asc")
        .onSnapshot(snaps=>{
            let comments=[];
            snaps.forEach(element => {
                comments.push({
                  createdBy:element.data().createdBy,
                  createdAt:element.data().createdAt,
                  text:element.data().text
                })
            });
            this.setState({commentLoading:false})
           this.setState({comments})
        })
        }
        axios.get(`/userimages`)
        .then(data=>{
            console.log(data.data)
            let resData=data.data
        let userImages=[]
            users.forEach(item1=>{
                resData.forEach(item2=>{
                    if(item1==item2.user){
                        userImages.push(item2)
                    }
                })
            })
        this.setState({userImages})
        })
        .catch(err=>{
            console.log(err)
        })
    }

   

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
          })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        this.setState({loading:true})
        const {projectId,taskId} = this.props.match.params
        let data=this.state
        let taskBefore=this.state.taskInfo
    const taskEdit={
        type:data.type,
        title:data.title,
        startdate:data.startdate,
        enddate:data.enddate,
        priority:data.priority,
        assignee:data.assignee,
        status:data.status,
        description:data.description,
        isCompleted:data.isCompleted,
        createdBy:data.createdBy,
        createdAt:data.createdAt
    }
    console.log(taskBefore)
    console.log(taskEdit)
    
    let isObjEqual=()=>{
        for(let key1 in taskBefore){
            for(let key2 in taskEdit){
                if(key1 == key2){          
                    if(taskBefore[key1] !== taskEdit[key2]){
                        console.log(taskBefore[key1],taskEdit[key2])
                        return false
                    }
                }
            }
        }
        return true
    }
    if(isObjEqual()){
        this.setState({loading:false})
        Swal.fire({
            icon:"info",
            toast:true,
            title:"No changes made",
            position: 'top-end',
            showConfirmButton: false,
            
            showClass: {
              popup: ''
            },
            timer: 2500
          })
    }
    else{
        axios.post(`/updatetask`,{
            projectId:projectId,
            taskId:taskId,
            taskEdit:taskEdit
        })
        .then(res=>{
            this.setState({open:false,loading:false,taskInfo:taskEdit})
            Swal.fire({
                icon:"success",
                toast:true,
                title: "Task updated successfully",
                position: 'top-end',
                showConfirmButton: false,
                
                showClass: {
                  popup: ''
                },
                timer: 2500
              })
        })
        .catch(err=>{
            this.setState({loading:false})
            Swal.fire({
                icon:"error",
                toast:true,
                title:"Something went wrong, Please try again",
                position: 'top-end',
                showConfirmButton: false,
                
                showClass: {
                  popup: ''
                },
                timer: 2500
              })
        })
    }
    }


    handleNewComment=(e)=>{
        e.preventDefault()
        this.setState({commentBtnLoading:true})
        let newComment={
            projectId:this.state.projectId,
            taskId:this.state.taskId,
            createdBy:localStorage.getItem("email"),
            text:this.state.commentText
        }
        this.setState({text:''})
        $("#commentDescription").val("")
        axios.post(`/newcomment`,newComment)
        .then(res=>{
            this.setState({commentBtnLoading:false})
            console.log("commented")
        })
        .catch(err=>{
            this.setState({commentBtnLoading:false})
            console.log(err)
        })
    }

    onOpenModal = () => {
        this.setState({ open: true });
      };
    
      onCloseModal = () => {
        this.setState({ open: false });
      };
    render() {
        return (
            <div>
                <Presentation
                {...this.state}
                onOpenModal={this.onOpenModal}
                onCloseModal={this.onCloseModal}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleNewComment={this.handleNewComment}
                />
            </div>
        )
    }
}

export default Container
