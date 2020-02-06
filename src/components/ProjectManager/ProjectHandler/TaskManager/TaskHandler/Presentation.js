import React from 'react'
import Modal from 'react-responsive-modal'
import {Link} from 'react-router-dom'
import NewTask from '../NewTask'
import { Spinner,Table } from "reactstrap"
import TaskPDF from './TaskPDF'
import $ from "jquery"
import {Button,Icon,Form,Comment,Header , Grid ,Loader,Placeholder} from 'semantic-ui-react'
function Presentation(props) {
    const { taskInfo ,open, onOpenModal,onCloseModal,handleChange,handleSubmit,loading,userList,handleNewComment,comments,text,commentBtnLoading,taskViewLoader,commentLoading } = props
    console.log(commentLoading,taskViewLoader)
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
      
   const  handlePrint=()=>{
        $("#task_pdf_btn").trigger("click");
    }
    return (
        <div>
            <div className="m-2 p-3 bg-light rounded">
                <Header  as="h3"  image={<Icon name="tasks"/>} content={taskInfo.title} />
            </div>
            <div className="m-2 p-4 ">
                <div className=" mb-1 mt-1">
                    {taskViewLoader?<Placeholder>
                        <Placeholder.Line length='full' />
                        <Placeholder.Line length='very long' />
                        <Placeholder.Line length='long' />
                        <Placeholder.Line length='medium' />
                        <Placeholder.Line length='short' />
                        <Placeholder.Line length='very short' />
                    </Placeholder>
                    :
                    <div className="row p-1 border rounded">
                        <div className=" col-md-8">
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
                    </div>
                    <div className="col-md-4  p-2 mt-1 mb-1">
                <Button color='blue' className="w-100 m-1" onClick={onOpenModal}>
                    <Icon inverted  name='pencil' /> Edit Task
                </Button>
                <Button color='blue' className="w-100 m-1" >
                    <Icon inverted  name='plus' />New Task
                </Button>
                <Button color='blue'  onClick={handlePrint} className="w-100 m-1" >
                    <Icon inverted  name='file pdf' />PDF
                </Button>
                <Modal  open={open} onClose={onCloseModal}>
                    <h2>Edit Task</h2>
                    <Form onSubmit={handleSubmit}>
                    <Form.Group widths='equal'>
                    <Form.Field>
                    <label>Task type:</label>
                    <select onChange={handleChange} defaultValue={taskInfo.type}  name="type" required="required">
                    <option value="">----</option>
                        <option value="Task">Task</option>
                        <option value="Bug">Bug</option>
                    </select>
                    </Form.Field>
                        
                    </Form.Group>
                    <Form.Field>
                        <label>Name*:</label>
                        <Form.Input fluid placeholder='Name' name="title" defaultValue={taskInfo.title} onChange={handleChange} required/>
                    </Form.Field>
                    <Form.Group widths='equal'>
                    <Form.Field>
                    <label>Status:</label>
                    <select onChange={handleChange}  defaultValue={taskInfo.status} name="status" required="required">
                    <option value="">----</option>
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                    </select>
                    </Form.Field>
                    <Form.Field>
                    <label>Priority:</label>
                    <select onChange={handleChange}  defaultValue={taskInfo.priority} name="priority" required="required">
                        <option value="">----</option>
                        <option value="Urgent">Urgent</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field>
                        <label for="project_startdate">Start date:</label>
                        <Form.Input type="date" id="project_startdate"  defaultValue={taskInfo.startdate} onChange={handleChange} name="startdate" required="required"/>
                        </Form.Field>
                        <Form.Field>
                        <label for="project_enddate">End date:</label>
                        <Form.Input type="date" id="project_enddate"  defaultValue={taskInfo.enddate} name="enddate" onChange={handleChange} required="required"/>
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                    <Form.Field>
                    <label>Assignee:</label>
                    <select name="assignee" onChange={handleChange}  defaultValue={taskInfo.assignee} required="required">
                    <option value="">----</option>
                        {
                        userList.map(user=>{
                            return <option value={user}>{user}</option>
                        })
                        }
                    </select>
                    </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field style={{width:"100%"}}>
                        <label>Description:</label>
                        <textarea name="description"  defaultValue={taskInfo.description} onChange={handleChange} >

                        </textarea>
                        </Form.Field>
                    </Form.Group>
                    {!loading?<Button  type="submit">Update</Button>:<Button type="button" loading>Update</Button>}
                    </Form>
                </Modal>
                </div>
                    </div>
                    }
                </div>
                
                
            </div>
            <div className="border m-2 rounded p-2">
                <Header as='h3' dividing>
                Comments
                </Header>
            {!commentLoading?<Comment.Group>
                {comments.map(comment=>{
                    return( <Comment>
                     <Comment.Avatar src='/images/avatar/small/matt.jpg' />
                     <Comment.Content>
                         <Link to={"/dashboard/console/employeelist/"+comment.createdBy}><Comment.Author as="a">{comment.createdBy}</Comment.Author></Link>
                         <Comment.Metadata>
                        <div>{formatDate(comment.createdAt.seconds)}</div>
                         </Comment.Metadata>
                         <Comment.Text>{comment.text}</Comment.Text>
                     </Comment.Content>
                     <hr/>
                     </Comment>)
                })}
               
                <Form  onSubmit={handleNewComment}>
                <Form.TextArea name="commentText"  id="commentDescription" onChange={handleChange} required="required"/>
                {commentBtnLoading?<Button type="button" icon='edit' color="blue" loading>Add Comment</Button>:<Button content='Add Comment' type="submit"  labelPosition='left' icon='edit' primary />}
                </Form>
            </Comment.Group>
            :
            <Placeholder>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
            </Placeholder>
            }
            </div>
            <TaskPDF taskInfo={taskInfo} comments={comments}/>
        </div>
    )
}

export default Presentation
