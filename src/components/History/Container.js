import React, { Component } from "react";
import axios from 'axios'
import Presentation from './Presentation'
import fire from '../Firebase/firebase'
import {Link} from 'react-router-dom'
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyData: []
    };
  }
  componentDidMount() {
    const { userRole,email,managerRole,adminRole,HistoryListData } = this.props
    if(HistoryListData.length>0){
      let historyDocs=HistoryListData
      let historyData=[]
      historyDocs.forEach(item=>{
        if(userRole){
          if(email==item.data().ActionBy)
              historyData.push(item.data())
        }
        if(managerRole||adminRole){
          historyData.push(item.data())
        }
      })
      this.setState({historyData})
    }
  }
  render() {
    let tabularData=[]
    console.log(this.state.historyData)
    if(this.state.historyData.length>0){
    tabularData=this.state.historyData.map(history=>{
     let subjectFormatted=formatSubject(history.type,history.subject)
        return {
          ActionBy:formatActionBy(history.ActionBy),
          createdAt:formatDate(history.createdAt.seconds),
          subject:subjectFormatted
        }
    })
}
    function formatDate(timeStamp){
      let d = new Date(timeStamp*1000)
      let hours=d.getHours()
      let min=d.getMinutes()
      let AmOrPm=hours>12? "PM" : "AM"
      hours=hours%12;
      hours=hours?hours:12
      hours=hours<10?'0'+hours:hours
      min=min<10?'0'+min:min
      let day=d.getDate()<10?'0'+d.getDate():d.getDate()
      let month=(d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1)
      let time=hours+':'+min+' '+AmOrPm
      let DateTime=day+'/'+month+'/'+d.getFullYear()+','+time
     return DateTime
    }

    function formatActionBy(ActionBy){
      return <Link to={"/dashboard/console/employeelist/"+ActionBy}>{ActionBy}</Link>
    }

    function formatSubject(type,subject){ 
        switch(type){
          case "demoteuser":return <span>Demoted <Link to={"/dashboard/console/employeelist/"+subject}>{subject}</Link> to user.</span>
                              break;
          case "enableuser":return <span><Link to={"/dashboard/console/employeelist/"+subject}>{subject}</Link> is activated.</span>
                              break;  
          case "promoteuser":return <span>Promoted <Link to={"/dashboard/console/employeelist/"+subject}>{subject}</Link> to manager.</span>
                              break;   
          case "disableuser":return <span><Link to={"/dashboard/console/employeelist/"+subject}>{subject}</Link> is Suspended.</span>
                              break; 
          case "createProject":return <span>Created project <Link to={"/dashboard/console/projectmanagement/"+subject.pid}>{subject.title}</Link>.</span>
                              break; 
          case "createTask":return <span>Added task <Link to={"/dashboard/console/projectmanagement/"+subject.pid+"/"+subject.tid}>{subject.title}</Link>.</span>
                              break;   
          case "updateTask":return <span>Updated task <Link to={"/dashboard/console/projectmanagement/"+subject.pid+"/"+subject.tid}>{subject.title}</Link>.</span>
                              break;
          case "inviteUser":return <span>Invited <Link to={"/dashboard/console/employeelist/"+subject}>{subject}</Link>.</span>
                              break;                    
          case "userRegister":return <span>Employee <Link to={"/dashboard/console/employeelist/"+subject}>{subject}</Link> registered.</span>
                              break; 
        case "newComment":return <span> <Link to={"/dashboard/console/projectmanagement/"+subject.pid+"/"+subject.tid}>{subject.title}</Link> .</span>
                              break;                      
        }
    }
    const columns = [
      {
        Header: "User",
        accessor: "ActionBy",
        sortable:false
      },
      {
        Header: "TimeStamp",
        accessor: "createdAt",
        filterable: false,
        sortable:false
      },
      {
        Header: "History",
        accessor: "subject",
        sortable:false
      },
      
    ];
    return (
      <Presentation
      columns={columns}
      tabularData={tabularData}
      />
    );
  }
}
export default Container;
