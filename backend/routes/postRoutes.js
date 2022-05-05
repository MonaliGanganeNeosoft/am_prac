const express = require("express");

const router = express.Router();

const app = express();
const nodemailer = require("nodemailer");
const connectDb = require("../db/connectDb");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const jwt = require("jsonwebtoken");
const jwtSecret = "asd889asdas5656asdas887";
const bcrypt = require("bcryptjs");
require("dotenv").config();

connectDb();

const { userModel } = require("../models/userSchema");

const autenticateToken = async (req, res, next) => {
  const authHeader = await req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token + "/////////");
  if (token == null) {
    console.log("Token not match");
  } else {
    jwt.verify(token, jwtSecret, (err, data) => {
      if (err) {
        console.log("Token incorrect");
      } else {
        console.log("Match");
        next();
      }
    });
  }
};
router.get("/getall", (req, res) => {
  userModel.find({}, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});
router.get("/gets", autenticateToken, (req, res) => {
  console.log("get");
});

router.post("/adduser", (req, res) => {
  console.log(req.body);
  let ins = new userModel({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    gender: req.body.gender,
    photo: req.body.photo,
    isVerified: false,
  });
  ins.save((err) => {
    if (err) {
      res.json({
        message: "Oops !User already exists please try to login ",
        err: 1,
      });
    } else {
      rand = Math.floor(Math.random() * 100 + 54);
      host = req.get("host");
      link =
        "http://" + req.get("host") + "/api" + "/users" + "/verify?id=" + rand;
      console.log(link);
      let smtpTransoprt = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        auth: {
          user: process.env.email,
          pass: process.env.password,
        },
      });
      mailOptions = {
        to: req.body.email,
        subject: "Please confirm your Email account",
        html: `Please click here to verify <a href=${link} >verify email</a>`,
      };
      console.log(mailOptions);
      smtpTransoprt.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
          res.send("error");
        } else {
          console.log("Message sent: ");
          res.json({
            success: true,
            status_code: 200,
            message: `Hey ! ${req.body.fname} was registered successfully`,
            err: 0,
          });
        }
      });
    }
  });
});
router.get("/verify", function (req, res) {
  console.log(req.protocol + ":/" + req.get("host"));
  if (req.protocol + "://" + req.get("host") == "http://" + host) {
    console.log("Domain is matched. Information is from Authentic email");
    if (req.query.id == rand) {
      console.log("email is verified");
      res.end(`<h1>Email ${mailOptions.to} is been Successfully verified
            <a href="http://localhost:3000/login" >Login here now</a>
            <p>Thank you,</p>
            <p>Neostore</p>
            
            `);
      userModel.updateOne(
        { emailAddress: mailOptions.to },
        { $set: { isVerified: true } },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            console.log("Updated Docs : ", docs);
          }
        }
      );
    } else {
      console.log("email is not verified");
      res.end("<h1>OOPS ! Link is expired ...</h1>");
    }
  } else {
    res.end("<h1>Request is from unknown source");
  }
});
router.post("/getuser", (req, res) => {
  userModel.findOne({ email: req.body.email }, (err, data) => {
    // console.log(bcrypt.compareSync(req.body.password, data.password));
    console.log(data);
    if (err) {
      res.send("its error");
    } else if (data == null) {
      res.json({ err: 1, message: "Please write correct email id" });
    } else if (data.isVerified == false) {
      res.json({ err: 1, message: "please verify your email address" });
    } else if (bcrypt.compareSync(req.body.password, data.password)) {
      let payload = {
        email: req.body.email,
        fname: data.fname,
        lname: data.lname,
        gender: data.gender,
        phoneNum: data.phoneNumber,
        password: data.password,
        photo: data.photo,
        id: data._id,
        cartData: data.cartData,
      };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 });
      res.json({
        err: 0,
        success: true,
        status_code: 200,
        message: `Hey !${data.fname} You have logged In successfully`,
        token: token,
      });
    } else {
      console.log("hey");
      res.json({ err: 1, message: "Please Write correct password ha" });
    }
  });
});
module.exports = router;
