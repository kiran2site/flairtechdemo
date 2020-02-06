import React from 'react'
import { Card, Button, CardTitle, CardText,Form,FormGroup ,Label,Input} from 'reactstrap';
import AuthOneConfirm from '../../../UsefulComp/Modal/AuthOneConfirm'
import $ from 'jquery'
import UserForm from './UserForm'
class AuthOne extends React.Component {
    state={
        html:this.props.htmlContent
    }
    componentWillMount(){
        $("#placeit").html(this.props.htmlContent);
        if(this.props.AuthOneSuccess){
            console.log("succ")
            $("#placeit").html(this.props.htmlContent).delay(2000);
        }
    }
    render(){
    const {AuthOneSuccess,levelOneAuth,handleSubmit,tempPass,open,email,handleUser,htmlContent,incorrectPass}=this.props;
    
    return (
        <div>
             {
                 
             levelOneAuth?(
                        <p className="text-center p-3 bg-success mt-5 w-75 rounded shadow ml-auto mr-auto text-white">You have registered already!</p>
                        
                    )
                    :
                    (
                        <div>
                            {  
                                AuthOneSuccess?(
                                    <UserForm  email={email} handleSubmit={handleSubmit} htmlContent={htmlContent}/>
                                   
                                )
                                :
                                (
                                    <FormGroup className="widthsetter ml-auto mr-auto shadow rounded p-4 mt-5 bg-light">
                                        <Label for="password">Enter Password:</Label>
                                        <Input type="password" name="password" id="levelOneAuthPass" handleUser={handleUser} placeholder="Password" />
                                        {incorrectPass?<p className="text-danger">Incorrect Password</p>:<p></p>}
                                        <Button color="success" type="submit" onClick={handleUser}>Confirm</Button>
                                    </FormGroup>
                                )
                            }
                            
                             
                        </div>
                       
                    )
            }
            
        </div>
    )
}
}

export default AuthOne
