import React, { Component } from 'react'
import Presentation from './Presentation'
import fire from '../Firebase/firebase'
import $ from 'jquery'
import Swal from 'sweetalert2'
import Axios from 'axios'
class Container extends Component {
    constructor(){
        super();
        
    }
    
    state={
        userImage:"",
        userData:[],
        userInfo:[],
        InactiveCount:0,
        ActiveCount:0,
        SuspendedCount:0,
        userCheck:[],
        countList:0,
        userMails:[],
        userImages:[],
        adminRole:false,
        managerRole:false,
        userRole:false,
        selectCheck:false,
        sortableKey:"employee",
        originalData:[]
    }
    
    handleSort= (e) =>{
        let sortingtext=e.target.vale;
        this.state.userData.sort(()=>{

        })
    }
    MultiInvite=()=>{
        const mailsList=this.state.userCheck;

    }

    handleSelectAll= (e) =>{
        let allMails=[]
        this.state.userMails.forEach(item=>{
            allMails.push(item)
        })
        if(e.target.checked){
            this.setState({userCheck:allMails})
        }
        else{
            this.setState({userCheck:[]})
        }
    }

    
    handleSelectActive=(e)=>{
        let activeMails=[]
        this.state.userMails.forEach(item=>{
            if(item.userstatus=="Active")
            activeMails.push(item)
        })
        if(e){
            this.setState({userCheck:activeMails})
        }
        else{
            this.setState({userCheck:[]})
        }
    }

    handleSelectInactive=()=>{
        let inActiveMails=[]
        this.state.userMails.forEach(item=>{
            if(item.userstatus=="Inactive")
                inActiveMails.push(item)
        })
    }

    handleMailSort=(arr)=>{
        this.setState({userCheck:arr})
    }

    
    sortTableValues=(e,{value})=>{
        this.setState({sortableKey:value})
       console.log(this.state.userData)
    }

    handleSearchChange=(e,{value})=>{
        let sortedData=[]
        this.state.originalData.forEach(item=>{
            switch (this.state.sortableKey) {
                case 'employee':if(item.mail.includes(value)||item.mail.toUpperCase().includes(value))
                                    sortedData.push(item)
                                break;
                case 'employeeID':if(item.employeeId.includes(value)||item.employeeId.toLowerCase().includes(value)) 
                                    sortedData.push(item)                                   
                                break;
                case 'jobTitle':if(item.jobtitle.toLowerCase().includes(value)||item.jobtitle.includes(value)) 
                                    sortedData.push(item)                                   
                                break; 
                case 'department':if(item.department.includes(value)||item.department.toLowerCase().includes(value)) 
                                    sortedData.push(item)                                   
                                break;
                case 'employeeStatus':if(item.employeestatus.includes(value)||item.employeestatus.toLowerCase().includes(value)) 
                                    sortedData.push(item)                                   
                                break;
                case 'userType':if(item.usertype.includes(value)||item.usertype.toLowerCase().includes(value)) 
                                    sortedData.push(item)                                   
                                break;                                                                  
            }
            
        })
        this.setState({userData:sortedData})
    }

    handleSearch=(e)=>{
        let value=e.target.value;   
        
    }

    handleSingleMail =(mail)=>{
        const popEle=this.state.userCheck;
        let ids=this.state.userCheck
        if(ids.includes(mail)){
            let i=popEle.indexOf(mail)
            popEle.splice(i,1)
            this.setState({userCheck:popEle})
            this.setState({countList:popEle.length})
        }
        else{
            let append=[...popEle,mail]
            this.setState({userCheck:append})
            this.setState({countList:append.length})
        }
        
    }

    handleInvitedUsersAgain=()=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to invite again the selected users!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, invite!'
          }).then((result) => {
            if (result.value) {
             Axios.post(`/inviteagain`,{
                ActionBy: localStorage.getItem("email"),
                    maillist:this.state.userCheck
                })
                .then(res=>{    
                        Swal.fire({
                        icon:"success", 
                        toast:true,
                        title: "Selected users are invited again successfully!",
                        position: 'bottom-end',
                        showConfirmButton: false,
                        
                        showClass: {
                        popup: ''
                        },
                        timer: 2500
                    })
                })
                .catch(err=>{
                    Swal.fire({
                        icon:"error",
                        toast:true,
                        title: "Something went wrong please try again",
                        position: 'bottom-end',
                        showConfirmButton: false,
                        
                        showClass: {
                        popup: ''
                        },
                        timer: 2500
                    })
                })
            }
          })
       
    }


    showUser=()=>{

    }
    onHover=(e)=>{
        this.state.userImages.map(user=>{
            if(user.mail==e.target.id){
                this.setState({userImage:user.pic})
            }
        })
    }
    onHoverLeave = () => {
        this.setState({
            userImage:""
        })
      }

    componentDidMount=()=>{
        this.setState({adminRole:this.props.adminRole})
        this.setState({managerRole:this.props.managerRole})
        this.setState({userRole:this.props.userRole})
       if(this.props.users){    
            let users=this.props.users
            let countInactive=0;
            let CountActive=0;
            let CountSuspended=0;
            let mails=[]
            let userData=users.map(user=>{
                if(user.Role=="Admin")
                    return false
                if(user.status=="Inactive"){
                    countInactive++;
                    mails.push(user.useremail)
                    this.setState({InactiveCount:countInactive})
                    return {
                        name:" ",
                        mail:user.useremail,
                        phone:" ",
                        branch:" ",
                        employeeId:" ",
                        project:" ",
                        reportingmanager:" ",
                        employeestatus:" ",
                        usertype:" ",
                        jobtitle:" ",
                        employeetype:" ",
                        department:" ",
                        userstatus:user.status,
                        color:"orange"
                    }
                }
              
              // set undefined to spaced
                if(user.useremail==""||user.useremail==undefined)
                    user.useremail=" "
                if(user.personal.phonenumber==""||user.personal.phonenumber==undefined)
                    user.personal.phonenumber=" "
                if(user.personal.branch==""||user.personal.branch==undefined)
                    user.personal.branch=" "
                if(user.veridicID==""||user.veridicID==undefined)
                    user.veridicID=" "
                if(user.project==""||user.project==undefined)
                    user.project=" "
                if(user.personal.reportingmanager==""||user.personal.reportingmanager==undefined)
                    user.personal.reportingmanager=" "
                if(user.employeestatus==""||user.employeestatus==undefined)
                    user.employeestatus=" "
                if(user.Role==""||user.Role==undefined)
                    user.Role=" "
                if(user.personal.jobtitle==""||user.personal.jobtitle==undefined)
                    user.personal.jobtitle=" "
                if(user.workauth.work_type==""||user.workauth.work_type==undefined)
                    user.workauth.work_type=" "
                if(user.personal.department==""||user.personal.department==undefined)
                    user.personal.department=" "
                if(user.status==""||user.status==undefined)
                    user.status=" "
                

                // providing data for admin only
                if(this.props.adminRole||this.props.managerRole){
                    mails.push(user.useremail)
                    this.setState({userMails:mails})
                    if(user.status=="Active"){
                        CountActive++;
                        this.setState({ActiveCount:CountActive});
                        let userImages=this.state.userImages;
                        let image={
                            mail:user.useremail,
                            pic:user.imageURL
                        }
                        userImages.push(image);
                        
                    }
                    if(user.status=="Suspended"){
                        CountSuspended++
                        this.setState({SuspendedCount:CountSuspended})
                        let userImages=this.state.userImages
                        let image={
                            mail:user.useremail,
                            pic:user.imageURL
                        }
                        userImages.push(image)
                    }
                    this.setState({userMails:mails})
                    return {
                        name:user.personal.firstname+" "+user.personal.middlename,
                        mail:user.useremail,
                        phone:user.personal.phonenumber,
                        branch:user.personal.branch,
                        employeeId:user.veridicID,
                        project:user.project,
                        reportingmanager:user.personal.reportingmanager,
                        employeestatus:user.employeestatus,
                        usertype:user.Role,
                        jobtitle:user.personal.jobtitle,
                        employeetype:user.workauth.work_type,
                        department:user.personal.department,
                        userstatus:user.status,
                        image:user.imageURL,
                        color:"red"
                    }
                }
                
                
            })
            this.setState({userMails:mails})
            // to remove false value from users array formed due to admin role
            let i=userData.indexOf(false)
            userData.splice(i,1)
            this.setState({userData:userData})
            this.setState({originalData:userData})    
        }
    }
    
    render() {
        return (
            <div>
                <Presentation 
                onHover={this.onHover} 
                onHoverLeave={this.onHoverLeave} 
                handleSelectAll={this.handleSelectAll}  
                handleSingleMail={this.handleSingleMail} 
                {...this.state} 
                userData={this.state.userData}
                handleSearch={this.handleSearch}
                handleMailSort={this.handleMailSort}
                handleInvitedUsersAgain={this.handleInvitedUsersAgain}
                sortTableValues={this.sortTableValues}
                handleSearchChange={this.handleSearchChange}
                />
            </div>
        )
    }
}

export default Container
