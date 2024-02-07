import axios from "axios";

let BASE_URL = "http://127.0.0.1:5000";
let TOKEN_KEY = "token";

function post(route, body) {
  return axios.post(route, {
    data: body
  });
}

function authenticatedPost(route, headers, body) {
  headers["Authorization"] = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;
  return axios.post(route, {
    headers: headers,
    data: body
  })
}