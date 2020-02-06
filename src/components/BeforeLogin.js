import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import fire from './Firebase/firebase'
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
function BeforeLogin() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <Navbar color="light" light expand="md">
        <NavbarBrand href="/dashboard"><img src={Logo} height="60"/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto d-flex justify-content-around" navbar>
            <NavItem className="m-2 p-2">
              <Link to="/" className="nav-link shove">About</Link>
            </NavItem>
            <NavItem className="m-2 p-2">
              <Link to="/" className="nav-link shove">Contact</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
        </div>
    )
}

export default BeforeLogin
