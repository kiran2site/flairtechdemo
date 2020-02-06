import React from 'react'
import {Spinner} from 'reactstrap'
function Presentation(props) {
    const {helperText,isSetting,handleOldPass,handleConfirmPass,handleSetNewPass,handleSetPass,helperEight,helperNum,helperLower}=props
    return (
        <div className="changePassBox  bg-light ml-auto mr-auto mt-5 p-1 rounded">
             {/* <div className="m-2">
                <h6>Old password</h6>
                <input type="text" onChange={handleOldPass} className="form-control w-100"/>
            </div> */}
            <div className="m-2">
                 <h6>New password</h6>
                <input type="password" onChange={handleSetPass} className="form-control w-100"/>
            </div>
            <div className="m-2">
                <h6>Confirm new password</h6>
                <input type="password" onChange={handleConfirmPass} className="form-control w-100"/>
                 {helperText?<span className="helperText text-danger">Passwords doesn't match</span>:null} 
            </div>
            <div className="m-2">
            <h6 style={{fontSize:"small"}}>Make sure it's {helperEight?<span className="text-danger"> at least 8 characters </span>:<span className="text-success"> at least 8 characters</span>}</h6>
        <button className="ver-btn w-100" onClick={handleSetNewPass}>{isSetting?<Spinner size="sm"/>:("Change Password")}</button>
            </div>
        </div>
    )
}

export default Presentation
