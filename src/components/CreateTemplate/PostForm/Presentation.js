import React from 'react'
import $ from 'jquery'
import fire from '../../Firebase/firebase'
import { Spinner } from 'reactstrap';
import {Link} from 'react-router-dom'
import SendModal from '../../../UsefulComp/Modal/sendTemp'
import { loadPartialConfig } from '@babel/core';
import AuthOne from './AuthOne'
function Presentation(props){
    const {levelOneAuth,found,handleSubmit,load,open,handleUser,email,AuthOneSuccess,htmlContent,incorrectPass}=props;
   
    return(
        <div> 
            {
                found?(<AuthOne htmlContent={htmlContent} email={email} incorrectPass={incorrectPass} AuthOneSuccess={AuthOneSuccess} handleUser={handleUser} levelOneAuth={levelOneAuth } open={true} handleSubmit={handleSubmit}/>):(<p className="text-center">{load?<Spinner color="dark"/>:<p className="text-center p-3 bg-danger mt-5 w-75 rounded shadow ml-auto mr-auto text-white">You are not allowed to view this page</p>}</p>)
            }
           
           
        </div>
    )
}

export default Presentation