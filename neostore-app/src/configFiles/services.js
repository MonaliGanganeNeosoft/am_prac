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
