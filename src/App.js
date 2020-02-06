import React from 'react';
import NavBar from './components/NavBar'
import fire from './components/Firebase/firebase'
import Console from './components/Console'
// import CreateUser from './components/CreateUser'
import CreateTemplate from './components/CreateTemplate'
import Login from './AuthComponents/Login'
import PostData from './components/CreateTemplate/PostForm'
import CreateUser from './components/CreateUser'
import { BrowserRouter, Route , Switch,Redirect} from 'react-router-dom'
import {Spinner} from 'reactstrap'
import Dashboard from './components/Dashboard'
import EmployeeList from './components/EmployeeList'
import UpdatePass from './AuthComponents/UpdatePass'
import Individual from './components/Individual'
import ProjectList from './components/ProjectManager/ProjectList'
import ProjectHandler from './components/ProjectManager/ProjectHandler'
import VeridicLogo from './assets/logo.png'
import TaskHandler from './components/ProjectManager/ProjectHandler/TaskManager/TaskHandler'
import History from './components/History'
import LetterTemplates from './components/Templates/LetterTemplates'
class App extends React.Component {
  state={
    user:null,
    adminRole:false,
    managerRole:false,
    userRole:false,
    email:"",
    loading:true,
    network:false,
    users:[],
    projectListData:[],
    HistoryListData:[]
  }
  componentDidMount(){
    this.authListener()
    fire.firestore().collection("Users").onSnapshot(suc=>{
      this.setState({users:suc.docs.map(doc=>doc.data())})
    })
    fire.firestore().collection("Projects").onSnapshot(data=>{
       this.setState({projectListData:data})
    })
    fire.firestore().collection("History")
    .orderBy('createdAt','desc')
    .onSnapshot(data=>{
      this.setState({HistoryListData:data.docs})
    })
    
  }
  authListener=()=>{
    fire.auth().onAuthStateChanged((user)=>{
      if(user){
        console.log(user)
        this.setState({email:user.email})
        localStorage.setItem("email",user.email)
        user.getIdTokenResult().then(tokenResult=>{
          console.log(tokenResult.claims)
          this.setState({loading:false})
          if(tokenResult.claims.admin){
              this.setState({adminRole:true})
              this.setState({userRole:false})
          }
          else if(tokenResult.claims.manager){
            this.setState({managerRole:true})
            this.setState({userRole:false})
          }
          else{
            this.setState({userRole:true})
          }
         
        })
        
      }
      else{
         this.setState({user:null});
         this.setState({loading:false})
         this.props.history.push('/login')
      }
    })
    
  }
  render(){
  return (
    <div className="App">
         <div className="loading_overlay" style={this.state.loading?{display:"block"}:{display:"none"}}>
                <span className="overlay_comp text-center"><img src={VeridicLogo} height="200"/><br/></span>
            </div>
            {/* <div className="loading_overlay" style={this.state.network?{display:"block"}:{display:"none"}}>
                <span className="overlay_comp text-dark">Network Error!</span>
            </div> */}
      <div>
      <BrowserRouter>
          <NavBar  adminRole={this.state.adminRole} />
          
          <div className="w-100">
          <Switch>
            <Route exact path="/" component={()=> <Redirect to="/login"/>}/>
            <Route path="/login" component={Login}/>
            <Route exact path="/dashboard" component={()=><Dashboard email={this.state.email} adminRole={this.state.adminRole} managerRole={this.state.managerRole} userRole={this.state.userRole} />}/>
            <Route exact path="/dashboard/console" component={Console}/>
            <Route exact path="/dashboard/console/createtemplate" component={CreateTemplate}/>
            <Route path="/dashboard/console/createuser" component={()=><CreateUser adminRole={this.state.adminRole}/>}/>
            <Route path="/dashboard/console/postform/:email" component={PostData}/>
            <Route exact path="/dashboard/console/employeelist" component={()=><EmployeeList adminRole={this.state.adminRole} users={this.state.users} userRole={this.state.userRole} managerRole={this.state.managerRole}/>}/>
            <Route exact path="/dashboard/console/employeelist/:email" component={Individual}/>
            <Route exact path="/dashboard/console/changepassword" component={()=><UpdatePass email={this.state.email}/>}/>
            <Route exact path="/dashboard/console/projectmanagement" component={()=><ProjectList loading={this.state.loading}  email={this.state.email} projectListData={this.state.projectListData} adminRole={this.state.adminRole}  managerRole={this.state.managerRole} userRole={this.state.userRole}/>}/>
            <Route exact path="/dashboard/console/projectmanagement/:projectId" component={ProjectHandler}/>
            <Route exact path="/dashboard/console/projectmanagement/:projectId/:taskId" component={TaskHandler}/>
            <Route exact path="/dashboard/console/history" component={()=><History userRole={this.state.userRole} HistoryListData={this.state.HistoryListData}  managerRole={this.state.managerRole}  adminRole={this.state.adminRole}  email={this.state.email}/>}/>
            <Route exact path="/dashboard/console/templates/lettertemplates" component={LetterTemplates}  />
          </Switch>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
   
}
}

export default App;
