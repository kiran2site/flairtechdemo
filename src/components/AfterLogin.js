import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import fire from './Firebase/firebase'
import {Redirect} from 'react-router-dom'
import AdminUI from './AdminUI'
import ManagerUI from './ManagerUI'
import UserUI from './UserUI'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  import Logo from '../assets/logo.png'
function AfterLogin(props) {
    const {adminRole,managerRole,userRole,logOut,user,profile,email}=props
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <React.Fragment>
          {user?
          <React.Fragment>
            {adminRole?<AdminUI logOut={logOut} user={user} profile={profile} email={email}/>:null}
            {managerRole?<ManagerUI logOut={logOut} user={user} profile={profile} email={email}/>:null}
            {userRole?<UserUI logOut={logOut} user={user} profile={profile} email={email}/>:null}
          </React.Fragment>
            :null
          }
            

        </React.Fragment>
    )
}

export default AfterLogin
