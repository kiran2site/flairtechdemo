import React, { Component } from 'react'
import Presentation from './Presentation'
import fire from '../../../Firebase/firebase'
class Container extends Component {
    state={
        activeIndex1:0,
        activeIndex2:0,
        activeIndex3:0,
        activeIndex4:0,
        taskList:[],
        thisWeekList:[],
        completedList:[],
        dueList:[],
        nextWeekList:[],
        email:""
    }

    componentDidMount=()=>{
      console.log(this.props)
      let email=localStorage.getItem("email")
      this.setState({email})
      let newDate1=new Date("Mon Dec 16 2019 17:58:36 GMT+0530 (India Standard Time)");
      // console.log((newDate.getTime()-newDate1.getTime())/(1000 * 3600 * 24))
      if(this.props.projectId){
      fire.firestore().collection("Projects")
      .doc(this.props.projectId)
      .collection("Tasks")
      .onSnapshot(data=>{
        let tasks=[];
        let thisWeek=[];
        let nextWeek=[]
        let completedTasks=[];
        let dueTasks=[];
        console.log(data)
        data.forEach(task=>{
            console.log(task.id)
            tasks.push({
                id:task.id,
                title:task.data().title,
                type:task.data().type,
                priority:task.data().priority,
                description:task.data().description,
                assignee:task.data().assignee,
                startdate:task.data().startdate,
                enddate:task.data().enddate,
                status:task.data().status
            })
          let isCompleted=task.data().isCompleted;  
          // let now=moment();
          // let TaskTime=moment(date)
          // present date
          var currentdate = new Date(); 
          var taskStartDate=new Date(task.data().startdate)
          var taskEndDate=new Date(task.data().enddate)
          let taskStartDiff=(taskStartDate.getTime()-currentdate.getTime())/ (1000 * 3600 * 24)
          let taskEndDiff=(taskEndDate.getTime()-currentdate.getTime())/ (1000 * 3600 * 24)
         console.log(task.status)
          if(task.data().status=="Closed"){
          completedTasks.push({
            id:task.id, 
            title:task.data().title,
            type:task.data().type,
            priority:task.data().priority,
            description:task.data().description,
            assignee:task.data().assignee,
            startdate:task.data().startdate,
            enddate:task.data().enddate,
            status:task.data().status
          })
         }
         else  if(taskStartDiff>0&&taskEndDiff>0){
            nextWeek.push({
              id:task.id,
              title:task.data().title,
              type:task.data().type,
              priority:task.data().priority,
              description:task.data().description,
              assignee:task.data().assignee,
              startdate:task.data().startdate,
              enddate:task.data().enddate,
              status:task.data().status
          })
          }
         else if(taskStartDiff<0&&taskEndDiff>0){
            thisWeek.push({
              id:task.id,
              title:task.data().title,
              type:task.data().type,
              priority:task.data().priority,
              description:task.data().description,
              assignee:task.data().assignee,
              startdate:task.data().startdate,
              enddate:task.data().enddate,
              status:task.data().status
          })
          }
          else if(taskStartDiff<0&&taskEndDiff<0){
            dueTasks.push({
              id:task.id,
              title:task.data().title,
              type:task.data().type,
              priority:task.data().priority,
              description:task.data().description,
              assignee:task.data().assignee,
              startdate:task.data().startdate,
              enddate:task.data().enddate,
              status:task.data().status
          })
          }
          else return null;
         
          
        })
        console.log(nextWeek)
        console.log(thisWeek)
        console.log(dueTasks)
        this.setState({taskList:tasks})
        this.setState({nextWeekList:nextWeek})
        this.setState({thisWeekList:thisWeek})
        this.setState({dueList:dueTasks})
        this.setState({completedList:completedTasks})
    })
    }
    }

    handleClick1 = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex1 } = this.state
        const newIndex = activeIndex1 === index ? -1 : index
    
        this.setState({ activeIndex1: newIndex })
      }

      handleClick2 = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex2 } = this.state
        const newIndex = activeIndex2 === index ? -1 : index
    
        this.setState({ activeIndex2: newIndex })
      }

      handleClick3 = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex3 } = this.state
        const newIndex = activeIndex3 === index ? -1 : index
    
        this.setState({ activeIndex3: newIndex })
      }

      handleClick4 = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex4 } = this.state
        const newIndex = activeIndex4 === index ? -1 : index
    
        this.setState({ activeIndex4: newIndex })
      }


    render() {
      const { userList, projectId } = this.props
        return (
            <div>
                  <Presentation
                  {...this.state}
                  userList={userList}
                  projectId={projectId}
                  handleClick1={this.handleClick1}
                  handleClick2={this.handleClick2}
                  handleClick3={this.handleClick3}
                  handleClick4={this.handleClick4}
                  newTask={this.newTask}
                  projectId={this.props.projectId}
                  />
            </div>
        )
    }
}

export default Container
