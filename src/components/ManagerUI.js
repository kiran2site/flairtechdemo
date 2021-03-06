import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import {Redirect} from 'react-router-dom'
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
    import Nopic from '../assets/flair-img/Nopic.png'
    import {Icon,Popup} from 'semantic-ui-react'
function AdminUI(props) {
    const {adminRole,managerRole,userRole,logOut,user,profile,email}=props
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
      <div className="navbar-fixed-top">
            <Navbar  className="navbar navbar-default shadow" light expand="md">
        <NavbarBrand href="/dashboard"><img src={Logo} height="60"/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto container" navbar>
            
            <div className="d-flex ml-auto mr-auto">
              <span></span>
              <Link to="/dashboard/console/projectmanagement" className="nav-link shove"><NavItem className="m-2 p-2"><span><Popup content='Task Management' offset='0, 10px' trigger={<Icon name="tasks" size="big"/>}  position='bottom center' /></span> </NavItem></Link>
           
              
              <Link to="/dashboard/timesheets" className="nav-link shove"><NavItem className="m-2 p-2"><span><Popup content='Time Sheets' offset='0, 10px' trigger={<Icon name="calendar alternate" size="big"/>}  position='bottom center' /></span></NavItem></Link>
           
            
              <Link to="/dashboard/wiki" className="nav-link shove"><NavItem className="m-2 p-2"><span><Popup content='Wiki' offset='0, 10px' trigger={<Icon name="file alternate outline" size="big"/>}  position='bottom center' /></span> </NavItem></Link>
           
            
              <Link to="/dashboard/discussions" className="nav-link shove"><NavItem className="m-2 p-2"><span><Popup content='Discussions' offset='0, 10px' trigger={<Icon name="discussions" size="big"/>}  position='bottom center' /></span> </NavItem></Link>
           
              <Link to="/dashboard/console/createuser" className="nav-link shove"><NavItem className="m-2 p-2"><span><Popup content='Invite Employees' offset='0, 10px' trigger={<Icon name="add user" size="big"/>}  position='bottom center' /></span> </NavItem></Link>
        

              <Link to="/dashboard/console/employeelist" className="nav-link shove"><NavItem className="m-2 p-2"><span><Popup content='Employees' offset='0, 10px' trigger={<Icon name="users" size="big"/>}  position='bottom center' /></span> </NavItem></Link>
        
              <Link to="/dashboard/console/history" className="nav-link shove"><NavItem className="m-2 p-2"><span><Popup content='History' offset='0, 10px' trigger={<Icon name="history" size="big"/>}  position='bottom center' /></span> </NavItem></Link>
        </div>
            
          <div className="">
            <UncontrolledDropdown nav Navbar>
              <DropdownToggle className="userinfo rounded"  nav>
                
                <span>{profile?<img src={profile} height="60"  className="userinfo"/>:<img src={Nopic} height="60"  className="userinfo bg-light"/>}</span>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem><span className="ml-2 mr-2">{email}</span></DropdownItem>
                <Link to="/dashboard/console" className="nav-link shove"><DropdownItem>Manager Console</DropdownItem></Link>
                
                
                <DropdownItem divider />
                <Link to="/dashboard/console/changepassword"><DropdownItem>Change Password</DropdownItem></Link>
                  <a onClick={logOut}><DropdownItem>Logout</DropdownItem></a>
                
              </DropdownMenu>
            </UncontrolledDropdown>
            </div>
           
          </Nav>
        </Collapse>
      </Navbar>
        </div>
    )
}

export default AdminUI
