import React, { Component } from 'react'
import { Button, Header, Image,Form,Dropdown } from 'semantic-ui-react'
import Modal from 'react-responsive-modal'
import Swal from 'sweetalert2'
import axios from 'axios'
import fire from '../../../Firebase/firebase'
class NewTask extends Component {
  state = { 
    open: false ,
    name:"",
    loading:false,
    type:"",
    title:"",
    startdate:"",
    enddate:"",
    priority:"",
    assignee:"",
    status:"",
    description:"",
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleChange=(e,)=>{
    console.log(e.target.name,e.target.value)
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  handleSubmit=()=>{
    this.setState({loading:true})
    let data=this.state
    const projectId=this.props.projectId
    const newTask=
    {
        type:data.type,
        title:data.name,
        startdate:data.startdate,
        enddate:data.enddate,
        priority:data.priority,
        assignee:data.assignee,
        status:data.status,
        description:data.description,
        isCompleted:false,
        createdBy:this.props.email,
        projectId:projectId
    }
    console.log(newTask)
    axios.post(`/task`,newTask)
    .then(res=>{
      this.setState({loading:false})
        console.log("succ")
        this.setState({ open: false });
        Swal.fire({
          icon:"success",
          toast:true,
          title: "Task created successfully",
          position: 'top-end',
          showConfirmButton: false,
          
          showClass: {
            popup: ''
          },
          timer: 2500
        })
      })
      .catch(err=>{
        console.log(err)
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
  render() {
    const { userList } = this.props
    const { open, dimmer } = this.state
    return (
      <div>
        <Button  onClick={this.onOpenModal}>New Task</Button>
        <Modal  open={open} onClose={this.onCloseModal}>
          <h2>New Task</h2>
          <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
          <Form.Field>
          <label>Task type:</label>
          <select onChange={this.handleChange} name="type" required="required">
          <option value="">----</option>
              <option value="Task">Task</option>
              <option value="Bug">Bug</option>
          </select>
          </Form.Field>
              
          </Form.Group>
          <Form.Field>
            <label>Name*:</label>
            <Form.Input fluid placeholder='Name' name="name" onChange={this.handleChange} required/>
          </Form.Field>
          <Form.Group widths='equal'>
          <Form.Field>
          <label>Status:</label>
          <select onChange={this.handleChange} name="status" required="required">
          <option value="">----</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
          </select>
          </Form.Field>
          <Form.Field>
          <label>Priority:</label>
          <select onChange={this.handleChange} name="priority" required="required">
              <option value="">----</option>
              <option value="Open">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
          </select>
          </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
            <label for="project_startdate">Start date:</label>
            <Form.Input type="date" id="project_startdate" onChange={this.handleChange} name="startdate" required="required"/>
            </Form.Field>
            <Form.Field>
            <label for="project_enddate">End date:</label>
            <Form.Input type="date" id="project_enddate" name="enddate" onChange={this.handleChange} required="required"/>
            </Form.Field>
          </Form.Group>
          <Form.Group>
          <Form.Field>
          <label>Assignee:</label>
          <select name="assignee" onChange={this.handleChange} required="required">
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
            <textarea name="description" onChange={this.handleChange} >

            </textarea>
            </Form.Field>
          </Form.Group>
        {!this.state.loading?<Button  type="submit">Create</Button>:<Button loading>Create</Button>}
        </Form>
        </Modal>
       
      </div>
    )
  }
}

export default NewTask
