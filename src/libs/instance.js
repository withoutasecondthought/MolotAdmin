import axios from "axios";
import constants from "./constants";

const instance = axios.create({
  baseURL: constants.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST",
  },
});

export default instance;
