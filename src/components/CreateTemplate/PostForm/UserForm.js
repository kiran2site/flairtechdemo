import React from 'react'
import $ from 'jquery'
import fire from '../../Firebase/firebase'
import { withRouter } from 'react-router-dom'
import {Icon,Label,Loader} from 'semantic-ui-react'
import {Form,FormGroup,Input,Progress,Spinner} from 'reactstrap'
import FileUploader from 'react-firebase-file-uploader'
import { parse } from 'path'
import axios from 'axios'
class UserForm extends React.Component{
    state={
        registering:false,
        currID:"",
        veridicID:"",
        avatar: "",
        upload:false,
        isUploading: false,
        progress: 0,
        avatarURL: null,
        passMatch1:"",
        passMatch2:"",
        password:"",
        setPassword:"",
        confirmPassword:"",
        passwordLength:0,
        PI_fname:"",
        PI_mname:"",
        PI_lname:"",
        PI_email:"",
        PI_phone:"",
        PI_department:"",
        PI_job:"",
        PI_report:"",
        PI_branch:"",
        PI_employment:"",
        PI_marital:"",
        PI_role:"",
        MA_LINE1:"",
        MA_LINE2:"",
        MA_CITY:"",
        MA_STATE:"",
        MA_ZIP:"",
        MA_COUNTRY:"",
        MA_FROM:"",
        MA_TO:"",
        EMC_name:"",
        EMC_phone:"",
        EMC_mail:"",
        EH_CLIENT:"",
        EH_CLIENTADD:"",
        EH_CLIENTMAIL:"",
        EH_VENDORNAME:"",
        EH_VENDORPHONE:"",
        EH_VENDORMAIL:"",
        EH_VENDORFROM:"",
        EH_VENDORTO:"",
        WA_TYPE:"",
        WA_NUMBER:"",
        WA_ISSUEDATE:"",
        WA_EXPDATE:"",
        WA_VENDORPHONE:"",
        WA_VENDORMAIL:"",
        WA_FROM:"",
        WA_TO:"",
        WA_FILE:""


    }
    componentDidMount(){
        $("#placeit").html(this.props.htmlContent);
        $("#PIb_mail").val(this.props.email)
        $("#PIb_mail").prop("readonly",true)
        $("#PIb_jobTitle").prop("readonly",true)
        $("#PIb_report").prop("disabled",true)
        $("#PIb_branch").prop("disabled",true)
        $("#PIb_employ").prop("disabled",true)
        $("#PIb_role").prop("disabled",true)
        $("#PIb_phone").attr("maxlength","10")
        $("#EMCe_phone").attr("maxlength","10")
        $("#b_EH_VENDORPHONE").attr("maxlength","10")
    }

    handleChangePass=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    Register=(e)=>{
        e.preventDefault();
        this.setState({registering:true})
    
        const personal={
            firstname:$("#PIb_fname").val(),
            middlename:$("#PIb_mname").val(),
            lastname:$("#PIb_lname").val(),
            emailid:$("#PIb_mail").val(),
            phonenumber:$("#PIb_phone").val(),
            department:$("#PIb_depart").val(), 
            jobtitle:$("#PIb_jobTitle").val(),
            reportingmanager:$("#PIb_report").val(),
            branch:$("#PIb_branch").val(),
            empolyeestatus:$("#PIb_employ").val(),
            maritalstatus:$("#PIb_marital").val(),
            role:$("#PIb_role").val(),
            }
            const mailingaddress={
            line1:$("#b_MA_LINE1").val(),
            line2:$("#b_MA_LINE2").val(),
            city:$("#b_MA_CITY").val(),
            state:$("#b_MA_STATE").val(),
            zip:$("#b_MA_ZIP").val(),
            country:$("#b_MA_COUNTRY").val(),
            from:$("#b_MA_FROM").val(),
            to:$("#b_MA_TO").val(),
            }
            const emergencycontact=[
                {
                    name:$("#EMCe_name").val(),
                    phone:$("#EMCe_phone").val(),
                    emailid:$("#EMCe_mail").val(),
                    id:1
                }
        ]
            const employmenthistory=[
            {
                client:$("#b_EH_CLIENT").val(),
                clientaddress:$("#b_EH_CLIENTADD").val(),
                yourworkingmailid:$("#b_EH_CLIENTMAIL").val(),
                vendorname:$("#b_EH_VENDORNAME").val(),
                vendorphone:$("#b_EH_VENDORPHONE").val(),
                vendoremail:$("#b_EH_VENDORMAIL").val(),
                from:$("#b_EH_FROM").val(),
                to:$("#b_EH_TO").val(),
                id:1
                }
        ]
            var date = new Date($('#b_WAb_issuedate').val());
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let issueDate=[day,month,year].join('/')
            var date2 = new Date($('#b_WAb_expdate').val());
            let day2 = date2.getDate();
            let month2 = date2.getMonth() + 1;
            let year2 = date2.getFullYear();
            let ExpDate=[day2,month2,year2].join('/')
            const workauth=[
                {
                work_type:$("#b_WAtype").val(),
                work_number:$("#b_WAnum").val(),
                work_issue:issueDate,
                work_exp:ExpDate,
                work_vendorphone:$("#b_WAvendorphone").val(),
                work_vendormail:$("#b_WAvendormail").val(),
                work_from:$("#b_WAfrom").val(),
                work_to:$("#b_WAto").val(),
                work_type:$("#b_WAtype").val(),
                id:1,
            }]
            
      

            console.log(this.props.email)
            let profileData={
                Role:"User",
                imageURL:this.state.avatarURL,
                employeestatus:"bench",
                workauth,
                employmenthistory,
                emergencycontact,
                mailingaddress,
                personal,
            }
        axios.post("/registernewuser",{
            email:this.props.email,
            password:this.state.setPassword,
            ActionBy:this.props.email,
            profileData:profileData
        })
        .then(res=>{
            console.log(res)
            this.props.history.push("/login")
        })
        .catch(err=>{
            this.setState({registering:false})
            console.log(err)
        })
     // end of register function 
    }
    // updating image to db
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
      this.setState({ isUploading: false });
      console.error(error);
    };
    handleUploadSuccess = filename => {
      this.setState({ avatar: filename, progress: 100,isUploading:false});
      fire
        .storage()
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then(url => {
            //getting url of the image from the db
            this.setState({ avatarURL: url,upload:true});
           
    });
    };
    render(){
        return(
             <Form className="widthsetter p-4 bg-light m-5 rounded shadow ml-auto mr-auto" onSubmit={this.Register}>
                 <div className="text-center">
                 {this.state.isUploading?<Progress animated striped color="success" className="" value={this.state.progress} />:<p></p>}
                 <div>
                 {this.state.avatarURL ? <img height="150" className="rounded" src={this.state.avatarURL} />:<span>Image required<span className="req-field">*</span></span>}
                 </div>
               
                <FileUploader
                    accept="image/*"
                    name={this.props.email}
                    randomizeFilename
                    storageRef={fire.storage().ref("images")}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                    
                />
                 </div>
                <div id="placeit" className="w ml-auto mr-auto">
                    
                </div>
                <FormGroup>
                    <label for="setPassword">Set Password</label>
                    <Input type="password" onChange={this.handleChangePass} name="password" id="setPassword" placeholder="" />
                </FormGroup>
                <FormGroup>
                    <label for="confirmPassword">Confirm Password</label>
                    <Input type="password" name="confirmPassword" onChange={this.handleChangePass} id="confirmPassword" placeholder="" />
                    <br/>
                    {this.state.setPassword===this.state.confirmPassword&&this.state.setPassword!==""?<Label><Icon name="checkmark" color="green"/>Passwords must match</Label>:<Label>Passwords must match</Label>}
                   {this.state.setPassword.length<8?<Label>Min 8 characters needed</Label>:<Label><Icon name="checkmark" color="green"/>Min 8 characters needed</Label>}
                </FormGroup>
                {this.state.registering?<button type="button" className="btn btn-primary w-100" disabled>Registering...</button>:(this.state.setPassword.length>7&&this.state.setPassword===this.state.confirmPassword&&this.state.setPassword!==""? <button className="btn btn-primary w-100"  type="submit">Register</button>:<button className="btn btn-primary w-100" type="button" disabled>Register</button>) }
              
             </Form>
        )
    }
    
}

export default withRouter(UserForm)