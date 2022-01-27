const jwt = require('jsonwebtoken')
const UserModel = require('../models/user-model')
require("dotenv").config();



const signup = (req, res) => {
    let newUser = new UserModel({
        firstName: req.body.data.firstName,
        lastName: req.body.data.lastName,
        email: req.body.data.email,
        password: req.body.data.password,
        quote: req.body.data.quote
    })
    newUser.save(function (err, newUser) {
        if (err) {
            res.status(409).json(err)
        } else {
            res.status(200).json(newUser)
        }
    })
}

const login = async (req, res) => {
    console.log(req.body.data);
    const user = await UserModel.findOne({ email: req.body.data.email, password: req.body.data.password })
    console.log(user);
    if (user) {
        const token = jwt.sign({
            name: user.name,
            email: user.email
        }, process.env.ACCESS_TOKEN_SECRET)

        return res.json({ status: 'ok', user: token })
    } else {
        return res.json({ status: "error", error: 'user-does-not-exists' })
    }
}
const getAllUsers = (req, res) => {
    UserModel.find((err, response) => {
        if (err)
            console.log(err);
        else
            res.send(response)
    })
}

const getAllUsersByEmail = (req, res) => {
    UserModel.find({ email: req.params.email }, (err, response) => {
        if (err)
            console.log(err);
        else
            res.send(response)
    })
}

const sendUserDetails = (req,res)=>{
    console.log(req.user);
    res.status(200).json({status:'ok',email:req.user.email})
}

module.exports = {
    signup,
    getAllUsers,
    getAllUsersByEmail,
    login,
    sendUserDetails
}
