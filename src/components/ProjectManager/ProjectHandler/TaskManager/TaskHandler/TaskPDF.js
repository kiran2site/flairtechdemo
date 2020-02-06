import React from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import {Icon} from 'semantic-ui-react'
import {Table} from 'reactstrap'
import Logo from '../../../../../assets/logo.png';
import {Comment} from 'semantic-ui-react';
import {Link} from 'react-router-dom'



class PageTemplate extends React.Component {
    render() {
        return (
            <div>
                 <header style={{ position: "absolute", top: "10px"}}>
                    <div  className="d-flex justify-content-between" > <span><img src={Logo} alt="logo" height="60" /></span><span >https://flair-d7b59.firebaseapp.com/dashboard
                    
                    </span></div>
                <hr style={{height:"1px",backgroundColor:"black",width:"480px" }}></hr>
                </header>

            
                <footer
              style={{ position: "absolute", bottom: "5px" }}
              
            >
              <span>
              <hr style={{height:"1px",backgroundColor:"black",width:"480px",marginRight:"70px"}}></hr>

                  <b>Contact details</b><br></br>
                  <Icon name="map marker"/>&nbsp;&nbsp;1565 Woodington Circle, Suite #203, Lawrenceville, GA – 30044.<br></br>
                  <Icon name="phone square"/>&nbsp;&nbsp; +1 513 488 4748<br></br>
                  <Icon name="mail square"/>&nbsp;&nbsp;contact@flairtechno.com<br></br>
              </span>
            </footer>

            </div>
        );
    }
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

class TaskPDF extends React.Component {
    pdfExportComponent;

    render() {
        console.log(this.props)
        const {taskInfo,comments} = this.props
        
        return (
            <div>
                <div className="example-config">
                    <button className="k-button" id="task_pdf_btn" onClick={() => { this.pdfExportComponent.save(); }}>
                        Export PDF
                    </button>
                </div>

                <PDFExport
                    paperSize="A4"
                    margin="2cm"
                    ref={(component) => this.pdfExportComponent = component}
                    pageTemplate={PageTemplate}
                >
                    <div id="taskpdf" style={{marginTop:"46px",height:"645px"}}>
                   <div className="d-flex">
                        <Table borderless className="b-none">
                            <tr>
                                <td><b>Created By:</b></td>
                                <td>{taskInfo.createdBy}</td>
                            </tr>
                            <tr>
                                <td><b>Assigned to:</b></td>
                                <td>{taskInfo.assignee}</td>
                            </tr>
                            <tr>
                                <td><b>Priority:</b></td>
                                <td>{taskInfo.priority}</td>
                            </tr>
                            <tr>
                                <td><b>Progress:</b></td>
                                <td>{taskInfo.status == "Open"?"Inprogress":"Completed"}</td>
                            </tr>
                        </Table>
                        <Table borderless className="b-none">
                            <tr>
                                <td><b>Start date:</b></td>
                                <td>{taskInfo.startdate}</td>
                            </tr>
                            <tr>
                                <td><b>End date:</b></td>
                                <td>{taskInfo.enddate}</td>
                            </tr>
                        </Table>
                   </div>
                   <div className="row m-2  rounded">
                       <h3>Comments</h3><hr></hr>
                     <div className="row m-2  rounded">
                        {comments.map(comment=>{
                            return (
                                <Comment style={{width:"500px"}}>
                     <Comment.Avatar src='/images/avatar/small/matt.jpg' />
                     <Comment.Content>
                        <Comment.Author>{comment.createdBy}</Comment.Author>
                         <Comment.Metadata>
                        <div>{formatDate(comment.createdAt.seconds)}</div>
                         </Comment.Metadata>
                         <Comment.Text>{comment.text}</Comment.Text>
                     </Comment.Content>
                     <hr/>
                     </Comment>
                               )
                        } )} 
                         <br></br>  
                      </div>
                   </div>
                   </div>
                </PDFExport>
            </div>
        );
    }
}

export default TaskPDF