import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import bcrypt from "bcryptjs";
import { addUser, sendEmail } from "./../configFiles/services";

import sweet from "sweetalert2";
import { Navigate, useNavigate, Link } from "react-router-dom";
const regForName = RegExp(/^[A-Za-z]{3,10}$/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass = RegExp(
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
);
const RegForMobile = RegExp("^((\\+91-?)|0)?[0-9]{10}$");
function Register() {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPass: "",
    photo: "",
  });
  const [password, setpassword] = useState("password");
  const [passwords, setpasswords] = useState("password");
  const [select, setSelect] = useState();
  const [state, setState] = useState({ flag: 0 });
  const [Errors, setError] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPass: "",
  });
  const navigate = useNavigate();

  const handleRegisterData = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "fname":
        Errors.fname = regForName.test(value)
          ? ""
          : "name should bet 2 to 20 letters";
        break;
      case "lname":
        Errors.lname = regForName.test(value)
          ? ""
          : "lname should be 2 to 10 letters";
        break;
      case "phoneNumber":
        Errors.phoneNumber = RegForMobile.test(value)
          ? ""
          : "phon no should be valid";
        break;
      case "email":
        Errors.email = regForEmail.test(value) ? "" : "invalid email";
        break;
      case "password":
        Errors.password = regForPass.test(value)
          ? ""
          : "psd must be 6 to 16 char";
        break;
      case "confirmPass":
        Errors.confirmPass =
          data.password == value ? "" : "psd and confirm should match";
    }
    setSelect({ Errors, [name]: value }, () => {
      console.log(Errors);
    });
    setData({ ...data, [name]: value });
    console.log(data);
  };
  const submitRegisterData = () => {
    var getSelectedValue = document.querySelector(
      'input[name="gender"]:checked'
    );
    if (
      data.fname == "" ||
      data.lname == "" ||
      data.email == "" ||
      data.password == "" ||
      data.confirmPass == "" ||
      data.phoneNumber == ""
    ) {
      sweet.fire({
        title: "all fields are required",
        icon: "warning",
        timer: 1000,
      });
    } else if (getSelectedValue == null) {
      sweet.fire({
        title: "pls select gender",
        icon: "warning",
        timer: 1000,
      });
    } else if (
      Errors.fname == "" &&
      Errors.lname == "" &&
      Errors.email == "" &&
      Errors.password == "" &&
      Errors.confirmPass == "" &&
      Errors.phoneNumber == ""
    ) {
      const saltRounds = 10;
      const myPlaintextPassword = data.password;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(myPlaintextPassword, salt);
      console.log(hash);
      addUser({
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        password: hash,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        photo: "user.png",
      }).then((res) => {
        if (res.data.err == 1) {
          sweet.fire({
            title: res.data.message,
            icon: "warning",
            timer: 2000,
          });
        } else {
          sweet.fire({
            title: res.data.message,
            text: "Thank you for your patience !verifiction link is sent to your email address !kindly verify to login",
            icon: "success",
          });
          navigate("/login");
        }
      });
    }
  };
  const verifyEmail = () => {
    sendEmail({ email: data.email });
  };
  return (
    <>
      <Container className="my-5 border" style={{ width: "60%" }}>
        <h1>Register to neostore</h1>
        <Form>
          {Errors.fname.length > 0 && (
            <span style={{ color: "red" }}>{Errors.fname}</span>
          )}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="first name"
              className="py-2"
              name="fname"
              onChange={handleRegisterData}
            />
          </Form.Group>

          {Errors.lname.length > 0 && (
            <span style={{ color: "red" }}>{Errors.lname}</span>
          )}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="last name"
              className="py-2"
              name="lname"
              onChange={handleRegisterData}
            />
          </Form.Group>
          {Errors.email.length > 0 && (
            <span style={{ color: "red" }}>{Errors.email}</span>
          )}
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="email address"
              className="py-2"
              name="email"
              onChange={handleRegisterData}
            />
          </Form.Group>
          {Errors.password.length > 0 && (
            <span style={{ color: "red" }}>{Errors.password}</span>
          )}
          <Form.Group className="mb-3">
            <Form.Control
              type={password}
              placeholder="password"
              onChange={handleRegisterData}
              name="password"
              reduired
            />
          </Form.Group>

          {Errors.lname.length > 0 && (
            <span style={{ color: "red" }}>{Errors.confirmPass}</span>
          )}
          {Errors.confirmPass.length > 0 && (
            <span style={{ color: "red" }}>{Errors.confirmPass}</span>
          )}
          <Form.Group className="mb-3">
            <Form.Control
              type={password}
              placeholder="confirm password"
              onChange={handleRegisterData}
              name="confirmPass"
              required
            />
          </Form.Group>
          {Errors.phoneNumber.length > 0 && (
            <span style={{ color: "red" }}>{Errors.phoneNumber}</span>
          )}
          <Form.Group>
            <Form.Control
              type="number"
              placeholder="mobile number"
              className="py-2"
              name="phoneNumber"
              onChange={handleRegisterData}
            />
          </Form.Group>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="gens"
              onChange={handleRegisterData}
              value="Female"
            />
            <label
              className="form-check-label"
              for="flexRadioDefault1"
              value="Female"
            >
              Female
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="flexRadioDefault2"
              onChange={handleRegisterData}
              value="Male"
            />
            <label className="form-check-label" for="flexRadioDefault2">
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="flexRadioDefault2"
              onChange={handleRegisterData}
              value="Others"
            />
            <label className="form-check-label" for="flexRadioDefault2">
              Others
            </label>
          </div>

          <Button
            className="text-black"
            style={{ width: "15%", backgroundColor: "grey", border: "none" }}
            onClick={submitRegisterData}
          >
            Register
          </Button>
          <span>Already Registered user?</span>
          <Link to="/login" style={{ marginLeft: "10px", color: "black" }}>
            Login here
          </Link>
        </Form>
      </Container>
    </>
  );
}

export default Register;
