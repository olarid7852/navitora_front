import Axios from "axios";
import store from "../store/index.js";

let API_HOSTNAME = "http://localhost:8001/api/"
const execute = async function (url, method, data, params, headers) {
  console.debug(data)
  console.debug(headers)
  let options = {
    url: API_HOSTNAME + url,
    method,
    data,
    params,
    headers
  }
  return Axios(options)
}
const register = function (data) {
  return execute("rest-auth/registration/", 'post', data, {}, {})
}

const login = async function (data) {
  try {
    let result = await execute("rest-auth/login/", 'post', data, {}, {})
    store().commit("auth/update_key", result.data.key)
    return result
  } catch (err) {
    console.debug(err)
    throw (err)
  }
}
const get_auth_headers = function () {
  return {
    Authorization: "Token " + store().getters["auth/get_key"]
  }
}

const get = function (url, params = {}) {
  return execute(url, 'get', {}, params, {})
}

const post = function (url, data, params = {}) {
  return execute(url, 'post', data, params, {})
}
const auth_post = function (url, data, params = {}) {
  let headers = get_auth_headers()
  return execute(url, 'post', data, params, headers)
}

export default ({
  register,
  login,
  get,
  post,
  auth_post
})
