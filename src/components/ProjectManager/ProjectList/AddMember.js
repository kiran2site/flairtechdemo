import React, { Component } from "react";
import { Dropdown, Grid ,Header,Button,List} from "semantic-ui-react";
import axios from 'axios'
import fire from '../../Firebase/firebase'
import Swal from 'sweetalert2'
class DropdownExampleRemote extends Component {
  state = {
    multiple: true,
    search: true,
    searchQuery: null,
    fetchMails:true,
    value: [],
    options: [],
    userMails:[],
    placeUsers:[]
  };


  componentDidMount=()=>{
    const {fetchMails,options,userMails}=this.props
    this.setState({placeUsers:this.props.currUsers})
    this.setState({options})
    this.setState({userMails})
    this.setState({fetchMails})
  }

  // addMembersToProject=()=>{
  //     let users=this.state.value;
  //     let currUsers=this.props.currUsers;
  //     let projectId=this.props.projectId;
  //     users.forEach(user1 => {
  //           currUsers.forEach(user2=>{
  //               if(user1==user2){
  //                   if(users.length==1){
  //                       this.setState({value:[]})
  //                   }
  //                   else{
  //                       let popped=users.pop(user1)
  //                       this.setState({value:popped})
  //                   }
  //                  Swal.fire({
  //                       icon:"error",
  //                       toast:true,
  //                       title: user1+" already exists in the project",
  //                       position: 'bottom-end',
  //                       showConfirmButton: false,
                        
  //                       showClass: {
  //                         popup: ''
  //                       },
  //                       timer: 2500
  //                     })
  //               }
  //           })
  //     });
  //     let addUsers=this.state.value
  //     if(addUsers.length>0){
  //     fire.firestore().collection("Projects").doc(projectId)
  //     .update({
  //         Users:[...currUsers,...addUsers]
  //     })
  //     .then(suc=>{
  //       Swal.fire({
  //           icon:"success",
  //           toast:true,
  //           title: "Selected members added to the project successfully",
  //           position: 'bottom-end',
  //           showConfirmButton: false,
            
  //           showClass: {
  //             popup: ''
  //           },
  //           timer: 2500
  //         })
  //         this.setState({value:[]})
  //         console.log("success")
  //     })
  //     .catch(err=>{
  //         console.log(err)
  //     })
  //     }
  // }
  handleChange = (e, { value }) =>{
    const { handleProjectMembers } = this.props;
    handleProjectMembers(value);
    this.setState({ value })
    
  };
  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery });

  render() {
    const { multiple, options, isFetching, search, value, fetchMails } = this.state;

    return (
      <Grid>
        <Grid.Column>
          <Dropdown
            fluid
            selection
            multiple={multiple}
            search={search}
            options={options}
            value={value}
            placeholder="Add Members"
            onChange={this.handleChange}
            onSearchChange={this.handleSearchChange}
            disabled={isFetching}
            loading={fetchMails}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default DropdownExampleRemote;
