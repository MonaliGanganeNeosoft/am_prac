import React, { useRef, useState, useEffect } from "react";
import { Button, Row, Col, Card, Form } from "react-bootstrap";

import { Link, useNavigate, Navigate } from "react-router-dom";

import { getUser, checkSocial } from "../configFiles/services";
import sweet from "sweetalert2";

import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Alert } from "@mui/material";

import { useDispatch } from "react-redux";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [eye, seteye] = useState(true);
  const [password, setpassword] = useState("password");
  const [type, settype] = useState(false);
  const [show, setShow] = useState(false);
  const [state, setState] = useState({ flag: 0 });
  const Eye = () => {
    if (password == "password") {
      setpassword("text");
      seteye(false);
      settype(true);
    } else {
      setpassword("password");
      seteye(true);
      settype(false);
    }
  };
  const handleLoginData = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
    console.log(loginData);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = () => {
    if (loginData.email == "" || loginData.password == "") {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    } else {
      checkSocial({
        email: loginData.email,
        password: loginData.password,
      }).then((res) => {
        if (res.data.err == 0) {
          getUser({
            email: loginData.email,
            password: loginData.password,
          }).then((res) => {
            if (res.data.err == 0) {
              sweet.fire({
                title: res.data.message,
                icon: "success",
                timer: 2000,
              });
              localStorage.setItem("_token", res.data.token);
              dispatch({ type: "login" });
              navigate("/");
              dispatch({ type: "cartLen" });
            } else if (res.data.err == 1) {
              sweet.fire({
                title: res.data.message,
                icon: "error",
                timer: 1000,
              });
            }
          });
        } else if (res.data.err == 1) {
          sweet.fire({
            title: res.data.message,
            icon: "warning",
            timer: 1000,
          });
        }
      });
    }
  };
  return (
    <div>
      {show == true && (
        <Alert
          serverity="error"
          className="fw-bold"
          style={{ fontSize: "25px" }}
        >
          All fields are required
        </Alert>
      )}
      <Row style={{ width: "100%" }}>
        <Col style={{ width: "50%" }}>
          <FormControl
            sx={{ border: "2px solid rgb(223,223,223)", width: "90%" }}
            className="p-3 my-3 py-5"
          >
            <h1>Login to neostore</h1>
            <TextField
              style={{
                width: "100%",
                border: "1px solid rgb(223,223,223)",
                outline: "none",
              }}
              className="my-4"
              id="outlined-basic"
              variant="outlined"
              placeholder="email"
              name="email"
              onChange={handleLoginData}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <TextField
                style={{
                  width: "100%",
                  border: "1px solid rgb(223,223,223)",
                  outline: "none",
                }}
                className="my-4"
                id="outlined-basic"
                variant="outlined"
                placeholder="Password"
                name="password"
                type={password}
                onChange={handleLoginData}
                required
              ></TextField>
              <div
                style={{
                  position: "absolute",
                  rigth: "37px",
                  bottom: "140px",
                  fontSize: "21px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {/* <i
                  onClick={Eye}
                  className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}
                ></i> */}
              </div>
            </Form.Group>
            <Button
              className="text-black"
              style={{ width: "15%", backgroundColor: "grey", border: "none" }}
              onClick={loggedIn}
            >
              Login
            </Button>
            <Link
              to="/register"
              style={{
                marginLeft: "10px",
                textDecoration: "none",
                color: "black",
              }}
            >
              Register now
            </Link>
            <br />
            <Link
              to="/forgotpasssword"
              style={{
                marginLeft: "10px",
                textdecoration: "none",
                color: "black",
              }}
            >
              Forgot passsword?
            </Link>
          </FormControl>
        </Col>
      </Row>
      {state.flag == 1 && <Navigate to="/dashboard" />}
    </div>
  );
}

export default Login;
