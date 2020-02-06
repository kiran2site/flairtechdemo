import React from 'react'
import PostData from '../CreateTemplate/PostForm'
import {Card,CardTitle,Button} from 'reactstrap'
import {Link} from 'react-router-dom'
import SendModal from '../../UsefulComp/Modal/sendTemp'
import Swal from 'sweetalert2'
import $ from 'jquery'
function Presentation(props) {
    const {handleChange,handleClick,placeHtml}=props
    const placeOld=()=>{
        
        $("#placeHtml").html(placeHtml);
        $("#createbtn").fadeIn(1000);
        }
    const createUser=()=>{
        (async () => {

            const { value: email } = await Swal.fire({
              title: 'Input email address',
              input: 'email',
              showCancelButton:true,
              inputPlaceholder: 'Enter the email address of the user'
            })
            
            if (email) {
                handleClick(email)
            }
            
            })()
    }
       
    return (
        <div>
            <div>
            <Card body className="text-center w-75 ml-auto mr-auto mt-4">
            <CardTitle>Do you want to send previous template or create a new one?</CardTitle>
            <button onClick={placeOld} className="ver-btn w-50 ml-auto mr-auto">Old Template</button>
            {props.adminRole?<Link to="/dashboard/console/createtemplate"><Button className="w-50">Create New template</Button></Link>:null}
           
            
             </Card>
            </div>
            <div id="createbtn" className="ml-auto text-center">
                {/* <SendModal buttonLabel="Create New User" handleChange={handleChange} handleClick={handleClick}/> */}
                <button className="btn btn-primary ml-auto mr-auto" onClick={createUser}>Create New User</button>
            </div>
            <div id="placeHtml" className="w-75 ml-auto mr-auto">
                
            </div>
        </div>
    )

}

export default Presentation
