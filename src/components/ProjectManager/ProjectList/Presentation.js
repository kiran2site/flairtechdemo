import React from 'react'
import ReactTable from 'react-table-6'
import {CustomInput,Badge,Spinner} from 'reactstrap'
import {Link} from 'react-router-dom'
import {Button,Label,Icon} from 'semantic-ui-react'
import NewProject from './NewProject'
import "react-table-6/react-table.css"
import ExportToExcel from './ExportToExcel'
import $ from 'jquery'
import Pdf from './Pdf'



class Presentation extends React.Component{
  state ={
    chkbdata:[],
    projectCheckId:[]
  } ;

    handleExcel=()=>{
      $("#test-table-xls-button").trigger("click");
    }
    handlePdf=()=>{
      console.log("got")
      $("#export_to_pdf_btn").trigger("click");
    }
  
    handleSingleProject=(e)=>{
      let projectId=e.target.id;
      let ids=this.state.projectCheckId
      if(ids.includes(projectId)){
        let i=ids.indexOf(projectId)
        ids.splice(i,1)
        this.setState({projectCheckId:ids})
      }
      else{
        let append=[...ids,projectId]
            this.setState({projectCheckId:append})
      }
      this.setState({projectId:ids})
    } 

    handleSelectAll=(e)=>{
      let projectsIDS=[]
      this.props.projectList.forEach(item => {
          projectsIDS.push(item.id)
      });
      if(e.target.checked){
        this.setState({projectCheckId:projectsIDS})
      }
      else{
        this.setState({projectCheckId:[]})
      }
     
    }

       render(){
        console.log(this.state.projectCheckId)
        const {projectList, fetchMails, options, userMails, userRole, email, mailsLoaded}=this.props
        const  columns=[
          {
            Header:<CustomInput type="checkbox" id="projectCheckList" onChange={this.handleSelectAll}/>,
            Cell:props=>{
                return (
                    <CustomInput type="checkbox" id={props.original.id} onChange={this.handleSingleProject} checked={this.state.projectCheckId.includes(props.original.id)}/> 
                )
            },
            sortable:false,
            style:{
                textAlign:"center"
            },
            filterable:false
        },
                 {
                    Header: 'Client Name',
                    id:"clientname",
                    accessor: projectList=><Link  to={"/dashboard/console/projectmanagement/"+projectList.id}>{projectList.clientname}</Link>,
    
                    filterMethod: (filter, projectList) => {
                      return !projectList._original.clientname.indexOf(filter.value);
                    }
                  },
                  {
                    Header: 'Start date',
                    accessor: 'startdate',
                    sortable:false,
                    filterable:false
                  },
                  {
                    Header: 'End date',
                    accessor: 'enddate',
                    sortable:false,
                    filterable:false
                  },
                  {
                    Header: 'Status',
                    accessor: 'status',
                  }
                ]
     
    return (
        <div> 
           
            <div className="projectconsole d-flex justify-content-between bg-light m-1">
                <div className="projectcount m-2 d-flex">
                    <span><h5>Projects:<Label color="black">{projectList.length}</Label></h5></span>
                    <span><h5>Selected:<Label color="black">{this.state.projectCheckId.length}</Label></h5></span>
                </div>      
                <div className="newproject m-2 d-flex">
                
                    <span> <Button className="bg-info text-light" icon labelPosition='left' onClick={this.handlePdf}>
                            <Icon name='file pdf' inverted />
                            PDF
                          </Button></span>
                    <span> <Button className="bg-info text-light" icon labelPosition='left' onClick={this.handleExcel}>
                            <Icon name='file excel' inverted />
                            Excel
                          </Button></span>
                    {!userRole?<span>
                      {mailsLoaded?<NewProject 
                         fetchMails={fetchMails}
                         options={options}
                         email={email}
                         userMails={userMails}/>
                        :
                        <Button disabled>New Project</Button>}
                         
                    </span>:null}
                </div>
            </div>
            <ReactTable
            id="rtable"
            columns={columns}
            data={projectList}
            filterable
            defaultPageSize={10}
            
            >
            {(state,filteredData, instance) =>{
               const reactTable=state.pageRows.map(post => {
                 return post._original
                });
              return(
                <div>
                  {filteredData()}
                <ExportToExcel posts={reactTable}/>
                <Pdf pdfdata={reactTable}/>
                </div>

              )
            }}
          </ReactTable>
            
        </div>
    )
  }
  }
export default Presentation
