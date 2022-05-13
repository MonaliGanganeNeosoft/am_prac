import React from "react";
import {
  Navbar,
  Form,
  Container,
  Button,
  Nav,
  FormControl,
  NavDropdown,
  Dropdown,
} from "react-bootstrap";
import { BrowserRouter, Link, Navigate, useNavigate } from "react-router-dom";

function Navbars() {
  return (
    <div>
      {" "}
      <Navbar bg="black" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#" className="me-5">
            <span className="text-white h2">Neo</span>
            <span className="text-danger h2">STORE</span>
          </Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
          {/* <Navbar.Collapse id="navbarScroll"> */}
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className="text-white mx-5 px-3">
              {" "}
              <Link className="decorateCart text-white" to="/">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link className="text-white mx-5 px-3">
              {" "}
              <Link className="decorateCart text-white" to="/register">
                Register
              </Link>
            </Nav.Link>
            <Nav.Link className="text-white mx-5 px-3">
              {" "}
              <Link className="decorateCart text-white" to="/login">
                Login
              </Link>
            </Nav.Link>
          </Nav>
          <Form
            className="d-flex"
            style={{ position: "relative", left: "-7%" }}
          ></Form>
          {/* </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </div>
  );
}

export default Navbars;
