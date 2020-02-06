import React from 'react'
import Swal from 'sweetalert2'
import { Spinner } from 'reactstrap'
import VeridicLogo from '../../assets/logo.png'
function Presentation(props){
    const { loading,handleChange,login,signing,handleResetPass,showPassword,isPasswordShown}=props
    // Swal.fire()
    const resetPass=()=>{
        (async () => {

            const { value: email } = await Swal.fire({
              title: "Enter your user account's verified email address and we will send you a password reset link.",
              input: 'email',
              showCancelButton:true,
              inputPlaceholder: 'Enter your email address'
            })
            
            if (email) {
                handleResetPass(email)
            }
            
            })()
    }
    return(
    //     <div className="background-set border">
            
    //         <div className="loading_overlay" style={loading?{display:"block"}:{display:"none"}}>
    //             <span className="overlay_comp"><img src={VeridicLogo} height="200"/></span>
    //         </div>
    //         <div className="login-form card bg-light">
    //             <div className="login-head p-3 rounded border bg-white">
    //                 <h2 style={{fontWeight:"300",textAlign:"center"}}>Login</h2>
    //             </div>
    //             <div className="card-body">
    //             <form onSubmit={login} className="form">
    //             <div className="form-group">
    //             <label htmlFor="email">Email:</label>
    //             <input type="text" className="form-control" id="email" onChange={handleChange} placeholder="Enter Email" name="email" required/>
    //             </div> 
                
    //             <div className="form-group">
    //             <label htmlFor="pwd">Password:</label>
    //             <input type="password" className="form-control" id="pass" onChange={handleChange} placeholder="Enter password" name="pswd" required/>
    //             </div>

    //             {signing?<button className="btn btn-dark w-100" disabled>Signing in...</button>:  <button className="btn btn-dark w-100"  type="submit">Sign in</button>}
               
    //             </form>
                
    //             <div className="">
    //                 <button onClick={resetPass} className="text-primary bg-light border ml-auto">Forgot Password</button>
    //             </div>
    //             </div>
    // </div>
           

    //     </div>
    <div className="App">
        <div  className="loading_overlay" style={loading?{display:"block"}:{display:"none"}}>
                 <span className="overlay_comp"><img src={VeridicLogo} height="200"/></span>
            </div>
      <div className="page-wrapper bg-gra-01 p-b-100">
        <div className="wrapper wrapper--w780">
            <div className="card card-3 row">
                <div className="card-heading col-sm">
                    {/* <img src={Flair}/> */}
                </div>
                <div className="card-body col-sm">
                     < img className="logo" src={VeridicLogo} alt=""/>
                    <form onSubmit={login} >
                       
                            <div className="input-group">
                            <input className="input--style-3" type="email" id="email" onChange={handleChange} placeholder="Email" name="email"
                            // onChange={handleInputChange}
                            /><br/><br/>
                           {/* {(<div className="Error">{this.state.fireErrors}</div>):null} */}
                        </div>
                        <div className="input-group">
                            <input className="input--style-3"  type={isPasswordShown ? "text" : "password"} id="pass" onChange={handleChange} placeholder="Password" name="pswd"
                           
                            />
                            <i
                  className={` fa ${
                    isPasswordShown
                      ? "fa-eye eye-open"
                      : "fa-eye-slash eye-close"
                  } password-icon `}
                  onClick={showPassword}
                /><br/><br/>
                    </div>
                        <div className="p-t-10">
                            {/* <button className="btn1 btn1--pill btn1--green" type="submit">Submit</button> */}
                             
                            {/* <button type="submit" id="bn" className="btn btn-success">Login</button> */}
                            {signing?<button className="btn btn-dark w-100" disabled>Signing in...</button>:  <button className="btn btn-dark w-100"  type="submit">Sign in</button>}
                            <div className="">
                     <a onClick={resetPass} className="sam" id="for-pass">Forgot Password?</a>
                </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    </div>

    )
}

export default Presentation