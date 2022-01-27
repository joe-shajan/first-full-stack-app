import axios from 'axios'
import authHeader from "../services/auth-header"
const { baseURL } = require('../constants/url')

const token = authHeader()
let authAxios = axios.create({
baseURL: baseURL ,
headers: token
})
export default authAxios