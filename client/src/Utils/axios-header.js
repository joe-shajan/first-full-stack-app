import axios from 'axios'
import authHeader, { adminAuthHeader } from "../services/auth-header"
const { baseURL } = require('../constants/url')

const token = authHeader()
let authAxios = axios.create({
baseURL: baseURL ,
headers: token
})
const adminToken = adminAuthHeader()
export const adminAuthAxios = axios.create({
baseURL: baseURL ,
headers: adminToken
})
export default authAxios