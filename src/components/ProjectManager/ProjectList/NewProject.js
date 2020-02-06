import React, { Component } from 'react'
import { Button, Header, Image,Form,Dropdown } from 'semantic-ui-react'
import {Label,Input} from 'reactstrap'
import Modal from 'react-responsive-modal'
import axios from 'axios'
import Swal from 'sweetalert2'
import fire from '../../Firebase/firebase'
import $ from 'jquery'
import AddMember from "./AddMember"
class NewProject extends Component {
  state = { 
    open: false ,
    name:"",
    status:"",
    startdate:"",
    enddate:"",
    supervisor:"",
    loading:false,
    createdBy:"",
    users:[],
    usersEval:[],
  }
  componentDidMount=()=>{
    this.setState({createdBy:this.props.email})
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
    let project=this.state
    const newProject={
        title:project.name,
        description:"",
        status:project.status,
        startdate:project.startdate,
        enddate:project.enddate,
        createdBy:this.state.createdBy,
        Users:project.usersEval 
    }

    axios.post(`/project`,newProject)
    .then(res=>{

      this.setState({ open: false ,loading:false});
      Swal.fire({
        icon:"success",
        toast:true,
        title: "Projected created successfully",
        position: 'top-end',
        showConfirmButton: false,
        showClass: {
          popup: ''
        },
        timer: 2500
      })
    })
    .catch(err=>{
      console.log("error")
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

  handleProjectMembers=(users)=>{
    let usersArr=[]
    users.forEach(user=>{
        usersArr.push({
          user:user,
          create:false,
          read:true,
          update:true,
          delete:false
        })
    })
    this.setState({usersEval:usersArr})
  }
  render() {
    const { open, dimmer } = this.state
    const { fetchMails, options, userMails } = this.props
    const leaderOptions=[
      { key: 'h', text: 'Harsha', value: 'harsha' },
      { key: 't', text: 'Teja', value: 'teja' },
    ]
    return (
      <div>
        <Button  onClick={this.onOpenModal}>New Project</Button>
        <Modal  open={open} onClose={this.onCloseModal}>
          <h2>New Project</h2>
          <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
              <Form.Field>
            <label>Name*:</label>
            <Form.Input fluid placeholder='Name' name="name" onChange={this.handleChange} required/>
          </Form.Field>
          <Form.Field>
          <label>Status:</label>
          <select onChange={this.handleChange} name="status" required="required">
              <option value="">----</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
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
            <Form.Input type="date" id="project_enddate" name="enddate" onChange={this.handleChange}/>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
          <Form.Field>
              <AddMember 
              fetchMails={fetchMails}
              options={options}
              userMails={userMails}
              handleProjectMembers={this.handleProjectMembers}
              />
          </Form.Field>
          <Form.Field></Form.Field>
          </Form.Group>
          
        {!this.state.loading?<Button  type="submit">Create</Button>:<Button type="button" loading>Create</Button>}
        </Form>
        </Modal>
       
      </div>
    )
  }
}

export default NewProject