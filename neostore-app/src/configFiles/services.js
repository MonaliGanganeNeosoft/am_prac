import axios from "axios";
import { MAIN_url } from "./MAIN_url";

export function addUser(data) {
  console.log("user added");
  return axios.post(`${MAIN_url}/users/adduser`, data);
}
export function sendEmail(data) {
  console.log("iam email");
  return axios.post(`${MAIN_url}/users/sendmail`, data);
}
export function checkSocial(data) {
  return axios.post(`${MAIN_url}/users/checksocial`, data);
}
export function addCartData(data) {
  return axios.post(`${MAIN_url}/users/addcart`, data);
}
export function getUser(data) {
  console.log("hey user");
  return axios.post(`${MAIN_url}/users/getuser`, data);
}
