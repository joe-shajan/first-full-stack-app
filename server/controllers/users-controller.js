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
            res.status(201).json(err)
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

        return res.json({ status: 'ok', user: { email: user.email, token } })
    } else {
        return res.json({ status: "error", error: 'user-does-not-exists' })
    }
}

const getAllUsers = (req, res) => {
    UserModel.find((err, response) => {
        if (err)
            console.log(err);
        else
            res.json(response)
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
const getUserById = (req, res) => {
    UserModel.findOne({ _id: req.params.id }, (err, response) => {
        if (err)
            console.log(err);
        else
            res.json(response)
    })
}

const sendUserDetails = (req, res) => {
    console.log(req.user);
    res.status(200).json({ status: 'ok', email: req.user.email })
}

const deleteUser = async (req, res) => {
    try {

        let { deletedCount } = await UserModel.deleteOne({ _id: req.params.id })
        console.log(deletedCount);
        if (deletedCount === 1) {
            res.status(200).json({ status: 'ok' })
        } else {
            res.status(204).json({ status: 'error' })
        }
    } catch (error) {
        res.status(400).json({ status: 'error' })

    }
}
const editUser = async (req, res) => {
    const { firstName, lastName, email } = req.body.data

    UserModel.updateOne({ _id: req.params.id }, { firstName, lastName, email }, (err, doc) => {
        if (err) { res.status(201).json(err) }
        else {
            if (doc.modifiedCount) { res.status(200).json({ status: 'ok' }) }
        }
    })
}

const searchUsersByEmail = (req, res) => {
    console.log(req.params.email);
    UserModel.find({ email: { $regex: req.params.email, $options: 'i' } }, (err, response) => {
        if (err)
            console.log(err);
        else
            res.json(response)
        // console.log(response);
    })
}


module.exports = {
    signup,
    getAllUsers,
    getAllUsersByEmail,
    login,
    sendUserDetails,
    deleteUser,
    getUserById,
    editUser,
    searchUsersByEmail
}
