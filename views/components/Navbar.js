import { useState, useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";
// import logo from '../assets/img/logo.svg';
// import navIcon1 from '../assets/img/nav-icon1.svg';
// import navIcon2 from '../assets/img/nav-icon2.svg';
// import navIcon3 from '../assets/img/nav-icon3.svg';


// import classes from './Navbar.module.css'

const NavBar = ({balance, standardUnit}) => {
  
  return (
    <nav>
      <div>Logo</div>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
      <div>
        Balance: {balance} {standardUnit}
      </div>
    </nav>
    // <Navbar expand="lg" className={scrolled ? "scrolled": ""}>
    //   <Container>
    //     <Navbar.Brand href="#home">
    //       <img src={''} alt="Logo" />
    //     </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" >
    //       <span  className="navbar-toggler-icon"></span>
    //     </Navbar.Toggle>
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link href="#home" className={setActiveLink === "home" ? "active navba-link" : "nav-link"} onClick={() => onUpdateActivelink('home')}>Home</Nav.Link>
    //         <Nav.Link href="#link" className={setActiveLink === "link" ? "active navba-link" : "nav-link"} onClick={() => onUpdateActivelink('Link')}>Link</Nav.Link>
    //       </Nav>
    //       <span className="navbar-text">
    //         <div className="social-icons"> 
    //         Balance: {balance} {standardUnit}
    //         </div>
    //         {/* <button className="vvd" onClick={{} => console.log('connect')}><span>Let's play</span></button> */}
    //       </span>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  )
}

export default Navbar;