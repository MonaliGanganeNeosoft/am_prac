import React, { useState, useEffect } from "react";
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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { BrowserRouter, Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Navbars() {
  const len = useSelector((state) => state.cartLength);
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
            {/* <Nav.Link className="text-white mx-5 px-3">
              {" "}
              <Link className="decorateCart text-white" to="/cart">
                Cart
              </Link>
            </Nav.Link> */}
            <Button className="mx-4 bg-white text-black">
              {" "}
              <Link to="/cart" className="decorateCart">
                {" "}
                <ShoppingCartIcon style={{ fontSize: "31px" }} />
                <span className="len">{len}</span>
              </Link>{" "}
            </Button>
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
