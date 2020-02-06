import React from 'react'
import Individual from '../Individual'
function Presentation(props) {
    
    const {userRole,adminRole,managerRole}=props
    return (
        <div className="">
             {adminRole?<h2 className="text-center mt-5">Welcome to Veridic Solutions</h2>:null}
             {userRole?<Individual userRole={userRole} />:null}
             {managerRole?<Individual managerRole={managerRole}/>:null}
        </div>
    )
}

export default Presentation
